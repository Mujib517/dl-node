CAF.SSTDR.Framework.FormattedReceiptTypeHeader objFormattedReceiptTypeHeader = new CAF.SSTDR.Framework.FormattedReceiptTypeHeader();
objFormattedReceiptTypeHeader = objFormattedReceiptType.Header;
if (objFormattedReceiptTypeHeader.DateSpecified != false)
{
    if (objFormattedReceiptTypeHeader.DateSpecified)
    {
        objtable_r_sdr_receipt.sdr_date_found = "T";
        if (objFormattedReceiptTypeHeader.Date != null)
        {
            if (PBF.Functions.Housekeeping.fnCoreValidation.IsValidDate(objFormattedReceiptTypeHeader.Date.ToString()))
            {
                if (objFormattedReceiptTypeHeader.TimeSpecified)
                {
                    if (!string.IsNullOrEmpty(objFormattedReceiptTypeHeader.Time.ToString()))
                    {
                        if (PBF.Functions.Housekeeping.fnCoreValidation.IsValidDate(objFormattedReceiptTypeHeader.Time.ToString()))
                        {
                            objFormattedReceiptTypeHeader.Date = DateTime.Parse(objFormattedReceiptTypeHeader.Date.ToShortDateString() + " " + objFormattedReceiptTypeHeader.Time.ToShortTimeString());
                        }
                    }
                }
                objFormattedReceiptTypeHeader.Date = TimeZoneInfo.ConvertTime(objFormattedReceiptTypeHeader.Date, systemTimeZone, CustomerZone);
                objtable_r_sdr_receipt.sdr_date_prn = objFormattedReceiptTypeHeader.Date.ToShortDateString();
                objStringBuilder.Append(@"<tr valign='top' " + fnAltRow() + @">
                                        <td>&nbsp;</td>
                                        <td XXLINE_NAMEXX >XXDATEXX: </td>
                                        <td>&nbsp;</td>
                                        <td XXLINE_VALUEXX >" + objFormattedReceiptTypeHeader.Date.ToShortDateString() + @"</td>
                                        <td>&nbsp;</td>
                                        </tr>");
            }
        }
}
                            }