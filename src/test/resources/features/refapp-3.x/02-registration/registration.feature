Feature: User Login
  Background:
    Given user login to the Registration Desk

  Scenario Outline: Search for a patient
    Given user arrives at the home page
    When the user search for "<patientName>"
    Then the patient should be there

    Examples:
      | patientName     |
      | Kevin Jones     |
