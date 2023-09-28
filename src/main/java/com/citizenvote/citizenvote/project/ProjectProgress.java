package com.citizenvote.citizenvote.project;

public enum ProjectProgress {
    // Is proposed by citizen.
    SUGGESTED,
    // Is approved by municipality, or proposed by municipality.
    ACCEPTED,
    //if a by citizen proposed project is declined
    DECLINED,
    // Have not enough votes in the given time, or project not reach 50% or more on positive vote .
    FAILED,
    // Project voting .
    PASSED,
    // a start can be made by the municipality
    APPROVED,
    // the municipality don't want to take it in implication.
    DISCARDED
}
