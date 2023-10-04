package com.citizenvote.citizenvote.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;

@Component
@RequiredArgsConstructor
public class UserSeeder implements CommandLineRunner {

    public final UserRepository userRepository;

    public final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedUsers();
    }

    private void seedUsers() {

        if (userRepository.count() == 0) {
            User u1 = User.builder()
                    .firstname("Truus")
                    .lastname("Tenenknijper")
                    .email("ttenenknijper@one-time-email.com")
                    .phoneNumber("0699581942")
                    .role(Role.CITIZEN)
                    .adress("Sesamstraat 5123B")
                    .username("ttenenknijper")
                    .points(0)
                    .postPrivilege(false)
                    .password(passwordEncoder.encode("eend43"))
                    .build();
            userRepository.save(u1);
            User u2 = User.builder()
                    .firstname("Karel")
                    .lastname("Koelkast")
                    .email("karelkoelkast@one-time-email.com")
                    .phoneNumber("0699581941")
                    .role(Role.CITIZEN)
                    .adress("Chillestraat 127")
                    .username("karel89")
                    .points(0)
                    .postPrivilege(false)
                    .password(passwordEncoder.encode("nEusHoOrn.28p"))
                    .build();
            userRepository.save(u2);
            User u3 = User.builder()
                    .firstname("Willem")
                    .lastname("Wasknijper")
                    .email("willem.wasknijper@citizen-vote.nl")
                    .phoneNumber("0699581940")
                    .role(Role.MANICIPALITY)
                    .adress("T.Baudetstraat 59")
                    .username("willem.wasknijper")
                    .points(0)
                    .postPrivilege(false)
                    .password(passwordEncoder.encode("kOEIenOog556,"))
                    .build();
            userRepository.save(u3);
            User u4 = User.builder()
                    .firstname("Kees")
                    .lastname("Kamerlamp")
                    .email("kees.k@one-time-email.com")
                    .phoneNumber("0699581939")
                    .role(Role.CITIZEN)
                    .adress("Broodje Kaasstraat 12")
                    .username("keesjek67")
                    .points(0)
                    .postPrivilege(false)
                    .password(passwordEncoder.encode("KipPenhOk88.9"))
                    .build();
            userRepository.save(u4);
            User u5 = User.builder()
                    .firstname("Gerrit")
                    .lastname("Gordijn")
                    .email("gordijnmans@one-time-email.com")
                    .phoneNumber("0699581938")
                    .role(Role.CITIZEN)
                    .adress("die ene hele lange straat naam die te lang is straat 61")
                    .username("gordijnmans77")
                    .points(0)
                    .postPrivilege(false)
                    .password(passwordEncoder.encode("blauw123"))
                    .build();
            userRepository.save(u5);
            User admin = User.builder()
                    .firstname("Meneer")
                    .lastname("van Beheer")
                    .email("admin@citizen-vote.nl")
                    .phoneNumber("0699581937")
                    .role(Role.ADMIN)
                    .adress("Serverkast 74")
                    .username("admin")
                    .points(0)
                    .postPrivilege(false)
                    .password(passwordEncoder.encode("admin"))
                    .build();
            userRepository.save(admin);
            User user = User.builder()
                    .firstname("Meneer")
                    .lastname("test")
                    .email("test@citizen-vote.nl")
                    .phoneNumber("0699581934")
                    .role(Role.CITIZEN)
                    .adress("Serverkast 73")
                    .username("user")
                    .points(0)
                    .postPrivilege(false)
                    .password(passwordEncoder.encode("user"))
                    .build();
            userRepository.save(user);
            User ambtenaar = User.builder()
                    .firstname("Meneer")
                    .lastname("test2")
                    .email("test2@citizen-vote.nl")
                    .phoneNumber("0699581933")
                    .role(Role.MANICIPALITY)
                    .adress("Serverkast 73")
                    .username("ambtenaar")
                    .points(0)
                    .postPrivilege(false)
                    .password(passwordEncoder.encode("ambtenaar"))
                    .build();
            userRepository.save(ambtenaar);

            User u6 = User.builder()
                    .firstname("punt")
                    .lastname("bruin puntje")
                    .email("pasta@gmail.com")
                    .phoneNumber("0699581939")
                    .role(Role.CITIZEN)
                    .adress("spoorlaan 6")
                    .username("punt")
                    .points(100000)
                    .postPrivilege(false)
                    .password(passwordEncoder.encode("punt"))
                    .build();
            userRepository.save(u6);

            for (int i = 0; i < 50; i++) {
                User us = User.builder()
                    .firstname("user")
                    .lastname("autouser")
                    .email("user" + i + "@botmail.com")
                    .phoneNumber("0699581" + (800 + i))
                    .role(Role.CITIZEN)
                    .adress("botlaan " + (i*2))
                    .username("user" + i)
                    .points(0)
                    .postPrivilege(false)
                    .password(passwordEncoder.encode("user" + i))
                    .build();
                userRepository.save(us);

            }


        }
    }
}
