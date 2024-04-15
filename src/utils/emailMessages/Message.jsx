import React from 'react';

function Message(props) {
    const { otp, firstName, target } = props;

    return (
        <html lang="en">

            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Email Verification</title>
            </head>

            <body style={{ padding: "0", fontFamily: "sans-serif" }}>
                <table role="presentation" cellSpacing={0} cellPadding={0} style={{ backgroundColor: '#fff', maxWidth: '42rem' }}>
                    <tbody>
                        <tr>
                            <td>
                                <table role="presentation" cellSpacing={0} cellPadding={0} width="100%" style={{ backgroundColor: '#365cce', color: '#fff', textAlign: 'center' }}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div style={{ padding: "20px 20px 10px" }}>
                                                    {/* <div style={{ borderTop: "1px solid", width: "40px", height: "20px", display: "inline-block" }}></div> */}
                                                    <img src="https://i.imgur.com/3z3v5sd.png" alt="Mail" height="45" />
                                                    {/* <div style={{ borderTop: "1px solid", width: "40px", height: "20px", display: "inline-block" }}></div> */}
                                                </div>
                                                <div style={{ padding: '0 20px 20px' }}>
                                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', textTransform: 'capitalize' }}>Email Verification</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table role="presentation" cellSpacing={0} cellPadding={0} width="100%" style={{ padding: '20px' }}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h4 style={{ color: '#374151' }}>Hi {firstName},</h4>
                                                <p style={{ lineHeight: '1.5', color: '#4b5563' }}>
                                                    {target === "sign-up" && "Thank you for registering with us."}{target === "forgot-password" && "You recently requested to reset your password for your account."} Please use the following <strong>One Time Password (OTP)</strong> to verify your email address.
                                                </p>
                                                <table role="presentation" cellSpacing={0} cellPadding={0} style={{ marginTop: '20px', textAlign: 'center' }}>
                                                    <tbody>
                                                        <tr>
                                                            {otp.toString().split("").map((value, index) =>
                                                                <>
                                                                    <td key={index} style={{ border: '1px solid #365cce', borderRadius: '5px', width: '30px', height: '30px', fontSize: '20px', fontWeight: 'bold', color: '#365cce' }}>
                                                                        {value}
                                                                    </td>
                                                                    <td style={{ width: "10px" }}></td>
                                                                </>
                                                            )}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <p style={{ marginTop: '20px', lineHeight: '1.75', color: '#4b5563' }}>This passcode will only be
                                                    valid for the next <strong>2 minutes</strong></p>
                                                <p style={{ marginTop: '20px', color: '#4b5563' }}>
                                                    Thanks to,<br /><strong>ABCD Team</strong>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table role="presentation" cellSpacing={0} cellPadding={0} width="100%" style={{ backgroundColor: '#eceef1', color: '#7b8794', padding: '20px' }}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                If this wasn't you, please ignore this email or contact our customer service center: <a href="mailto:journal@vidyasagar.mail.ac.in" style={{ color: '#365cce', textDecoration: 'none' }}>journal@vidyasagar.mail.ac.in</a> for
                                                further assistance.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table role="presentation" cellSpacing={0} cellPadding={0} width="100%" style={{ backgroundColor: '#365cce', color: '#fff', padding: '10px', textAlign: 'center' }}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p style={{ margin: 0, fontSize: '12px' }}>© 2024 Journal Submission. All Rights Reserved.
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>

        </html>
    );
}

export default Message;
