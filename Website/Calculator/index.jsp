<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="calculator" class="beans.CalculatorBean" scope="request"/>
<jsp:setProperty property="op1" name="calculator" param="op1"/>
<jsp:setProperty property="op2" name="calculator" value="${param.op2}"/>
<jsp:setProperty property="berechnung" name="calculator" value="${param.berechnung}"/>

<c:if test="${empty calculator.errorMsg && param.op1 != null && param.op2 != null && param.berechnung != null}">
	<jsp:forward page="result.jsp"/>
</c:if>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<form action="index.jsp" method="get">
<input type="text" name="op1" />
<input type="text" name="op2" />
<input type="text" name="berechnung" />
<input type="submit"/>
</form>
<c:if test="${not empty calculator.errorMsg}">Fehler: <jsp:getProperty property="errorMsg" name="calculator"/></c:if>
</body>
</html>