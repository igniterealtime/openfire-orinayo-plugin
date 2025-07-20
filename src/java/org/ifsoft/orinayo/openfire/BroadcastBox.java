/*
 * Copyright (C) 2017 Ignite Realtime Foundation. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
package org.ifsoft.orinayo.openfire;

import java.io.*;
import java.net.*;
import java.util.concurrent.*;
import java.util.*;
import java.util.function.*;
import java.util.stream.*;
import java.nio.file.*;
import java.nio.charset.*;
import java.security.Security;

import org.jivesoftware.openfire.container.Plugin;
import org.jivesoftware.openfire.container.PluginManager;
import org.jivesoftware.openfire.net.SASLAuthentication;
import org.jivesoftware.openfire.http.HttpBindManager;
import org.jivesoftware.openfire.XMPPServer;
import org.jivesoftware.openfire.sasl.AnonymousSaslServer;
import org.jivesoftware.openfire.muc.*;
import org.jivesoftware.openfire.user.UserManager;
import org.jivesoftware.util.cache.Cache;
import org.jivesoftware.util.cache.CacheFactory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.jivesoftware.util.JiveGlobals;
import org.jivesoftware.util.PropertyEventDispatcher;
import org.jivesoftware.util.PropertyEventListener;
import org.jivesoftware.util.StringUtils;

import org.eclipse.jetty.ee8.servlet.*;
import org.eclipse.jetty.ee8.webapp.WebAppContext;
import org.eclipse.jetty.ee8.proxy.ProxyServlet;

import java.lang.reflect.*;
import java.util.*;

import javax.sound.midi.Receiver;
import javax.sound.midi.MidiMessage;

import org.jitsi.util.OSUtils;
import de.mxro.process.*;
import de.mxro.process.internal.*;
import net.sf.json.*;
import org.xmpp.packet.*;
import io.github.leovr.rtipmidi.*;

import javax.jmdns.JmDNS;
import javax.jmdns.ServiceInfo;

public class BroadcastBox implements Plugin, PropertyEventListener, ProcessListener, MUCEventListener, Receiver
{
    private static final Logger Log = LoggerFactory.getLogger(BroadcastBox.class);
    private XProcess orinayoThread = null;
    private String orinayoExePath = null;
    private String orinayoHomePath = null;
    private ExecutorService executor;
    private WebAppContext jspService;		
    private Cache muc_properties;	
    private WhipIQHandler whipIQHandler;	
    private WhepIQHandler whepIQHandler;
	private OlMeetIQHandler olMeetIQHandler;
	private AppleMidiServer midiServer;
	private JmDNS jmdns;
	
    public static BroadcastBox self;	
	public ConcurrentHashMap<String, JSONObject> metaData = new ConcurrentHashMap<>();	
	

    public void destroyPlugin()     {
        PropertyEventDispatcher.removeListener(this);
        MUCEventDispatcher.removeListener(this);		

        try {
            Log.debug("orinayo terminated - started");			
            if (executor != null)  executor.shutdown();
            if (orinayoThread != null) orinayoThread.destory();
            if (jspService != null) HttpBindManager.getInstance().removeJettyHandler(jspService);	
			
			if (whipIQHandler != null) {
				whipIQHandler.stopHandler();
				XMPPServer.getInstance().getIQRouter().removeHandler(whipIQHandler);				
			}
			
			if (whepIQHandler != null) {
				whepIQHandler.stopHandler();	
				XMPPServer.getInstance().getIQRouter().removeHandler(whepIQHandler);				
			}

			if (olMeetIQHandler != null) {
				XMPPServer.getInstance().getIQRouter().removeHandler(olMeetIQHandler);
				olMeetIQHandler = null;	
			}				
			
			if (jmdns != null) jmdns.unregisterAllServices();
			if (midiServer != null) midiServer.stop();

			jspService.destroy();
			//Http3BindManager.getInstance().stop();	
            Log.debug("orinayo terminated - completed");
        }
        catch (Exception e) {
            Log.error("orinayo terminated - aborted", e);
        }
    }

    public void initializePlugin(final PluginManager manager, final File pluginDirectory)     {	
		muc_properties = CacheFactory.createLocalCache("MUC Room Properties");	
		
        PropertyEventDispatcher.addListener(this);
        MUCEventDispatcher.addListener(this);

		whipIQHandler = new WhipIQHandler();
		whipIQHandler.startHandler();		
		XMPPServer.getInstance().getIQRouter().addHandler(whipIQHandler);	
		XMPPServer.getInstance().getIQDiscoInfoHandler().addServerFeature("urn:xmpp:whip:0");				
		XMPPServer.getInstance().getIQDiscoInfoHandler().addServerFeature("urn:xmpp:whip:ice:0");
		
		whepIQHandler = new WhepIQHandler();
		whepIQHandler.startHandler();		
		XMPPServer.getInstance().getIQRouter().addHandler(whepIQHandler);	
		XMPPServer.getInstance().getIQDiscoInfoHandler().addServerFeature("urn:xmpp:whep:0");				
		XMPPServer.getInstance().getIQDiscoInfoHandler().addServerFeature("urn:xmpp:whep:ice:0");
		XMPPServer.getInstance().getIQDiscoInfoHandler().addServerFeature("urn:xmpp:whep:ext:0");

		olMeetIQHandler = new OlMeetIQHandler();
		XMPPServer.getInstance().getIQRouter().addHandler(olMeetIQHandler);
		XMPPServer.getInstance().getIQDiscoInfoHandler().addServerFeature("urn:xmpp:http:online-meetings:initiate:0");				
		XMPPServer.getInstance().getIQDiscoInfoHandler().addServerFeature("urn:xmpp:http:online-meetings#ohun");		
		
        checkNatives(pluginDirectory);
        executor = Executors.newCachedThreadPool();
        startGoProcesses(pluginDirectory);
        startJSP(pluginDirectory);		
		
		try {
			jmdns = new JmDNS();
			String serverName = XMPPServer.getInstance().getServerInfo().getXMPPDomain();
			ServiceInfo serviceInfo = new ServiceInfo("_apple-midi._udp.local.", serverName, 50004, "apple-midi");
			jmdns.registerService(serviceInfo);

		} catch (Exception e) {
			Log.error("MDNS registration failed", e);
		}
	
		//midiServer = new AppleMidiServer();
		//midiServer.addAppleMidiSession(new MidiReceiverAppleMidiSession(this));		
		//midiServer.start();		
		
        self = this;	
        //Http3BindManager.getInstance().pluginDirectory = pluginDirectory;		
        //Http3BindManager.getInstance().start();			
        Log.debug("orinayo initiated");
    }

    public static String getPort() {
        return "8080";
    }

    public static String getUDPPort() {
        return "10000";
    }

    public String getHome() {
        return orinayoHomePath;
    }

    public static String getUrl() {
        return "http://" + XMPPServer.getInstance().getServerInfo().getHostname() + ":" + getPort();
    }

    public static String getIpAddress() {
        String ourHostname = XMPPServer.getInstance().getServerInfo().getHostname();
        String ourIpAddress = "127.0.0.1";

        try {
            ourIpAddress = InetAddress.getByName(ourHostname).getHostAddress();
        } catch (Exception e) {

        }

        return ourIpAddress;
    }

	public static String getPublicIpAddress() {
		return "";
	}
	
    public URL getWebappURL()
    {
        final String override = JiveGlobals.getProperty( "orinayo.webapp.url.override" );
        if ( override != null && !override.trim().isEmpty() )
        {
            try
            {
                return new URL( override );
            }
            catch ( MalformedURLException e )
            {
                Log.warn( "An override for the webapp address is defined in 'orinayo.webapp.url.override', but its value is not a valid URL.", e );
            }
        }
        try
        {
            final String protocol = "https"; // No point in providing the non-SSL protocol, as webRTC won't work there.
            final String host = XMPPServer.getInstance().getServerInfo().getHostname();
            final int port = Integer.parseInt(JiveGlobals.getProperty("httpbind.port.secure", "7443"));
            final String path = "/orinayo/ohun";

            return new URL( protocol, host, port, path );
        }
        catch ( MalformedURLException e )
        {
            Log.error( "Unable to compose the webapp URL", e );
            return null;
        }
    }	
	
    public void onOutputLine(final String line)     {
        Log.debug("onOutputLine " + line);
    }

    public void onProcessQuit(int code)     {
        Log.debug("onProcessQuit " + code);
    }

    public void onOutputClosed() {
        Log.error("onOutputClosed");
    }

    public void onErrorLine(final String line)     {
        Log.debug(line);
    }

    public void onError(final Throwable t)     {
        Log.error("Thread error", t);
    }

    private void startJSP(File pluginDirectory)     {
        jspService = new WebAppContext(null, pluginDirectory.getPath() + "/classes/jsp",  "/orinayo");
        jspService.setClassLoader(this.getClass().getClassLoader());
        jspService.getMimeTypes().addMimeMapping("wasm", "application/wasm");
		
		String ipaddr = JiveGlobals.getProperty("orinayo.ipaddr", getIpAddress());
		String tcpPort = JiveGlobals.getProperty("orinayo.port", getPort());				
		String webUrl = "http://" + ipaddr + ":" + tcpPort;		
		
		ServletHolder proxyWhip = new ServletHolder(ProxyServlet.Transparent.class);
		proxyWhip.setInitParameter("proxyTo", webUrl);
		proxyWhip.setInitParameter("prefix", "/");
		jspService.addServlet(proxyWhip, "/api/whip/*");

		ServletHolder proxyWhep = new ServletHolder(ProxyServlet.Transparent.class);
		proxyWhep.setInitParameter("proxyTo", webUrl);
		proxyWhep.setInitParameter("prefix", "/");
		jspService.addServlet(proxyWhep, "/api/whep/*");		
 
		ServletHolder proxyStatus = new ServletHolder(ProxyServlet.Transparent.class);
		proxyStatus.setInitParameter("proxyTo", webUrl);
		proxyStatus.setInitParameter("prefix", "/");
		jspService.addServlet(proxyStatus, "/api/status/*");
		
        Log.debug("BroadcastBox jsp service enabled");
        HttpBindManager.getInstance().addJettyHandler(jspService);
    }

    private void startGoProcesses(File pluginDirectory)     {
        boolean orinayoEnabled = JiveGlobals.getBooleanProperty("orinayo.enabled", true);

        if (orinayoExePath != null && orinayoEnabled)	{
			String publicIpaddr = JiveGlobals.getProperty("orinayo.ipaddr.public", getPublicIpAddress());
			String ipaddr = JiveGlobals.getProperty("orinayo.ipaddr", getIpAddress());
			String tcpPort = JiveGlobals.getProperty("orinayo.port", getPort());	
			String udpPort = JiveGlobals.getProperty("orinayo.port.udp", getUDPPort());			
			String webUrl = "http://" + ipaddr + ":" + tcpPort;
			String publicHost = XMPPServer.getInstance().getServerInfo().getHostname() + ":" + JiveGlobals.getProperty("httpbind.port.secure", "7443");
			
			Engine.environment.put("APP_ENV", "production");
			Engine.environment.put("HTTP_ADDRESS", ipaddr + ":" + tcpPort);
			Engine.environment.put("HTTP_PUBLIC_HOST", publicHost);
			//Engine.environment.put("INTERFACE_FILTER", "eth0"); 		
			//Engine.environment.put("NETWORK_TYPES", "udp4");
			Engine.environment.put("UDP_MUX_PORT", udpPort);			
			Engine.environment.put("NETWORK_TEST_ON_START", "false");	
			Engine.environment.put("DEBUG_PRINT_OFFER", "true");			
			Engine.environment.put("DEBUG_PRINT_ANSWER ", "true");			
			
			if (publicIpaddr != null && !publicIpaddr.trim().equals("")) {
				Engine.environment.put("APPEND_CANDIDATE", "a=candidate:4167977883 1 udp 2130706431 " + publicIpaddr + " " + udpPort + " typ host ufrag mozzDGRqaVbksZdg\n");	
			} else {
				Engine.environment.put("STUN_SERVERS", "stun.l.google.com:19302|stun.freeswitch.org:3478|stun.3cx.com:3478");											
				Engine.environment.put("NAT_ICE_CANDIDATE_TYPE", "srflx"); 					
			}
			
 			orinayoThread = Spawn.startProcess(orinayoExePath, new File(orinayoHomePath), this);	
            Log.info("BroadcastBox enabled " + orinayoExePath);

        } else {
            Log.info("BroadcastBox disabled");
        }
    }

    private void checkNatives(File pluginDirectory)     {
        try
        {
            orinayoHomePath = pluginDirectory.getAbsolutePath() + File.separator + "classes";

            if(OSUtils.IS_LINUX64)
            {
                orinayoHomePath = orinayoHomePath + File.separator + "linux-64";
                orinayoExePath = orinayoHomePath + File.separator + "broadcast-box";
                makeFileExecutable(orinayoExePath);
            }
            else if(OSUtils.IS_WINDOWS64)
            {
                orinayoHomePath = orinayoHomePath + File.separator + "win-64";
                orinayoExePath = orinayoHomePath + File.separator + "broadcast-box.exe";
                makeFileExecutable(orinayoExePath);				

            } else {
                Log.error("checkNatives unknown OS " + pluginDirectory.getAbsolutePath());
                return;
            }
        }
        catch (Exception e)
        {
            Log.error("checkNatives error", e);
        }
    }

    private void makeFileExecutable(String path)     {
        File file = new File(path);
        file.setReadable(true, true);
        file.setWritable(true, true);
        file.setExecutable(true, true);
        Log.debug("checkNatives orinayo executable path " + path);
    }

    // -------------------------------------------------------
    //
    //  MIDIReceiver
    //
    // -------------------------------------------------------
	
    @Override
    public void send(MidiMessage message, long timeStamp) {
        Log.debug("midi receiver " + message);
    }

    @Override
    public void close() {
        Log.debug("midi receiver closed");
    }
	
    // -------------------------------------------------------
    //
    //  MUCEventListener
    //
    // -------------------------------------------------------

    public void roomCreated(JID roomJID)     {
		if (JiveGlobals.getBooleanProperty("orinayo.muc.enabled", false)) {		
			MUCRoom room = XMPPServer.getInstance().getMultiUserChatManager().getMultiUserChatService(roomJID).getChatRoom(roomJID.getNode());
		}
    }

    public void roomDestroyed(JID roomJID)     {

    }

    public void occupantJoined(JID roomJID, JID user, String nickname) {

    }

    public void occupantLeft(JID roomJID, JID user, String nickname) {

    }

	public void occupantNickKicked(JID roomJID, String nickname) {
		
	}
	
    public void nicknameChanged(JID roomJID, JID user, String oldNickname, String newNickname) {

    }

    public void messageReceived(JID roomJID, JID user, String nickname, Message message)  {
		final String from = user.toBareJID();
		final String room = roomJID.getNode();	
		final String body = message.getBody();
				
    }

    public void roomSubjectChanged(JID roomJID, JID user, String newSubject) {

    }

    public void privateMessageRecieved(JID a, JID b, Message message) {

    }
	

    public void roomClearChatHistory(long roomID, JID roomJID) {

    }

    public void roomCreated(long roomID, JID roomJID) {

    }
	
    public void roomDestroyed(long roomID, JID roomJID) {

    }	
	
    //-------------------------------------------------------
    //
    //  PropertyEventListener
    //
    //-------------------------------------------------------


    public void propertySet(String property, Map params) {

    }

    public void propertyDeleted(String property, Map<String, Object> params) {

    }

    public void xmlPropertySet(String property, Map<String, Object> params) {

    }

    public void xmlPropertyDeleted(String property, Map<String, Object> params) {

    }

	
    //-------------------------------------------------------
    //
    //  Utility methods
    //
    //-------------------------------------------------------	

	public String getJson(String urlToRead)  {
		URL url;
		HttpURLConnection conn;
		BufferedReader rd;
		String line;
		StringBuilder result = new StringBuilder();
		String ipaddr = JiveGlobals.getProperty("orinayo.ipaddr", getIpAddress());
		String tcpPort = JiveGlobals.getProperty("orinayo.port", getPort());			
		String uri = "http://" + ipaddr + ":" + tcpPort + urlToRead;

		try {
			url = new URL(uri);
			conn = (HttpURLConnection) url.openConnection();		
			conn.setRequestMethod("GET");
			rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			
			while ((line = rd.readLine()) != null) {
				result.append(line);
			}
			rd.close();

		} catch (Exception e) {
			Log.error("getJson", e);
		}

		return result.toString();
	}	
}