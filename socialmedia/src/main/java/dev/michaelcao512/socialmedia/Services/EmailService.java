package dev.michaelcao512.socialmedia.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;


@Service
public class EmailService {

@Autowired
private JavaMailSender mailSender;

    



    public void sendVerificationEmail(String toEmail, String Url){
        try{

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Email Verification");
        message.setText("Thank you for registering with the Social Media site! \n\n Please click this link within the next 4 hours to verify your account. \n\n  " + Url );
        mailSender.send(message);
       
        }
        catch (Exception e) {
            System.err.println("Failed to send verification email to " + toEmail + ": " + e.getMessage());
            throw new RuntimeException("Email sending failed", e);
        }
    
    
    
    }

    
public void sendTestemail(String toEmail){
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(toEmail);
    message.setSubject("Test Email");
    message.setText("This is a test email from Tyson developer extraordinaire.");
    mailSender.send(message);
    System.out.println("Email sent successfully");




}


}
