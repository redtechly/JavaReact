package net.javaguides.ems.aop;

import org.aspectj.lang.JoinPoint;
// import org.aspectj.lang.ProceedingJoinPoint;
// import org.aspectj.lang.annotation.After;
// import org.aspectj.lang.annotation.AfterReturning;
// import org.aspectj.lang.annotation.Around;
// import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Component
@Aspect

public class log {

    @Before("within(net.javaguides.ems.controller.*)")
    public void afterControllersInGeneral(JoinPoint joinPoint) {
        System.out.println("Before controller method : " + joinPoint.getSignature());
    }

}
