package edu.icet.dto;

import edu.icet.util.IdGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Student {

//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    String id;
    String name;
    String address;

}
