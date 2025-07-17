/*
 * Copyright (C) 2017-2023 Ignite Realtime Foundation. All rights reserved.
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


import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;


/**
 * Adds Content-Security-Policy headers to HTTP responses based on configuration from HTTP Binding / Bosh properties.
 *
 * @author Guus der Kinderen, guus@goodbytes.nl
 */
public class Http3BindContentSecurityPolicyFilter implements Filter {
    private static final Logger Log = LoggerFactory.getLogger(Http3BindContentSecurityPolicyFilter.class);
	
    public Http3BindContentSecurityPolicyFilter()
    {

    }
	
	public void init(FilterConfig fConfig) throws ServletException {

	}	
	
	public void destroy() {

	}	
	
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)	throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		Log.debug("Http3BindContentSecurityPolicyFilter HTTP Request: " + request.getMethod());

		HttpServletResponse resp = (HttpServletResponse) servletResponse;
		resp.addHeader("Alt-Svc","h3=\":443\"");		
		chain.doFilter(request, resp);
		return;
	}	
}
