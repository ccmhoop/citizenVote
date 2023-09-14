package com.citizenvote.citizenvote.project;

public enum ProjectProgress {
    // Is proposed by citizen.
    PROPOSED,
    // Is approved by municipality, or proposed by municipality.
    APPROVED,
    // Have not enough votes in the given time.
    FAILED,
    // Have enough votes, the municipality has to chose to take into implication or discard the project.
    HAVE_ENOUGH_VOTES,
    // a start can be made by the municipality
    TAKE_INTO_IMPLICATION,
    // the municipality don't want to take it in implication.
    DISCARDED
}
