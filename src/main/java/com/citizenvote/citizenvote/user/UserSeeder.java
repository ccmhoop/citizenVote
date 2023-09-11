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
    public void run(String... args){
        seedUsers();
    }

    private void seedUsers(){
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
    }

}
