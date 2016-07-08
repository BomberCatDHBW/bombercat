package beans;

import java.io.Serializable;

public class CalculatorBean implements Serializable
{
	private static final long serialVersionUID = -5791792312968360315L;
	private int op1 = 0;
	private int op2 = 0;
	private String berechnung = "";
	private String errorMsg = "";

	public CalculatorBean()
	{
	}

	  
    public void setOp1(String op1)
    {
        if (!op1.isEmpty())
        {
            try
            {
                this.op1 = Integer.parseInt(op1);
                
            }
            catch (Exception e)
            {
                errorMsg += e.getMessage() + ";";
            }
        }
    }

    public void setOp2(String op2)
    {
        if (!op2.isEmpty())
        {
            try
            {
                this.op2 = Integer.parseInt(op2);
            }
            catch (Exception e)
            {
                errorMsg += e.getMessage() + ";";
            }
        }
    }

    public void setBerechnung(String berechnung)
    {
        if (!berechnung.isEmpty())
        {
            if (berechnung.equals("plus") || berechnung.equals("minus") || berechnung.equals("geteilt") || berechnung.equals("mal"))
            {
                this.berechnung = berechnung;
            }
            else
            {
                errorMsg += "\"" + berechnung + "\" is not valid";
            }
        }
    }

	public int getErgebnis()
	{
		if (!errorMsg.isEmpty())
			return 0;

		if (berechnung.equals("plus"))
		{
			return op1 + op2;
		}
		else if (berechnung.equals("minus"))
		{
			return op1 - op2;
		}
		else if (berechnung.equals("geteilt"))
		{
			return op1 / op2;
		}
		else if (berechnung.equals("mal"))
		{
			return op1 * op2;
		}

		return 0;
	}

	public String getErrorMsg()
	{
		return errorMsg;
	}
}