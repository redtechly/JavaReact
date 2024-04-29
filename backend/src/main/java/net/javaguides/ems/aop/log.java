package net.javaguides.ems.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import net.javaguides.ems.service.AuthenticationService;

@Component
@Aspect

public class log {
    @Autowired
    private AuthenticationService authService;

    @Before("within(net.javaguides.ems.controller.*)")
    public void afterControllersInGeneral(JoinPoint joinPoint) {
        HttpServletRequest request = (HttpServletRequest) joinPoint.getArgs()[0];
        String authHeader = request.getHeader("Authorization");
        String jwtToken = authHeader.substring(7);
        System.out.println(authService.getUserFromToken(jwtToken).getId());
    }

}
