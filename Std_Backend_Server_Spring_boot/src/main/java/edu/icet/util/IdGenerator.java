package edu.icet.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class IdGenerator {
    private static int count = 0; // Counter to ensure unique IDs within the same second
    private static final int MAX_COUNTER = 999; // Reset counter after 999

    public static synchronized String generateID() {
        //get current date
        Date currentDate = new Date();
        String prefix = "IT";
        String timeStamp = new SimpleDateFormat("yyMMddHHmmss").format(currentDate);

        // Increment counter and reset after 999
        count = (count+1) % (MAX_COUNTER + 1);
        return prefix + timeStamp +  String.format("%03d", count);
    }
}
