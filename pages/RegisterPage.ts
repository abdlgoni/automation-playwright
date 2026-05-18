import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export interface RegisterDetails {
  title: "Mr." | "Mrs.";
  password: string;
  day: string;
  month: string;
  year: string;
  newsletter?: boolean;
  specialoffer?: boolean;
  firstname: string;
  lastname: string;
  company?: string;
  address1: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobilenumber: string;
}

export class RegisterPage extends BasePage {
  // Title radio button
  private readonly titleMr = this.page.getByRole("radio", { name: "Mr." });
  private readonly titleMrs = this.page.getByRole("radio", { name: "Mrs." });

  private readonly password = this.page.getByRole("textbox", {
    name: "Password *",
  });

  // Date of birth
  private readonly dayDropdown = this.page.locator("#days");
  private readonly monthDropdown = this.page.locator("#months");
  private readonly yearDropdown = this.page.locator("#years");

  private readonly newsletterCheckbox = this.page.getByRole("checkbox", {
    name: "Sign up for our newsletter!",
  });
  private readonly specialOfferCheckbox = this.page.getByRole("checkbox", {
    name: "Receive special offers from",
  });

  private readonly firstName = this.page.getByRole("textbox", {
    name: "First name *",
  });
  private readonly lastName = this.page.getByRole("textbox", {
    name: "Last name *",
  });
  private readonly company = this.page.getByRole("textbox", {
    name: "Company",
    exact: true,
  });
  private readonly address1 = this.page.getByRole("textbox", {
    name: "Address * (Street address, P.",
  });
  private readonly address2 = this.page.getByRole("textbox", {
    name: "Address 2",
  });
  private readonly country = this.page.getByLabel("Country *");
  private readonly state = this.page.getByRole("textbox", { name: "State *" });
  private readonly city = this.page.getByRole("textbox", {
    name: "City * Zipcode *",
  });
  private readonly zipcode = this.page.locator("#zipcode");
  private readonly mobileNumber = this.page.getByRole("textbox", {
    name: "Mobile Number *",
  });

  private readonly createAccountButton = this.page.getByRole("button", {
    name: "Create Account",
  });
  private readonly successMessage = this.page.getByText("Account Created!");
  constructor(page: Page) {
    super(page);
  }

  private readonly continueButton = this.page.getByRole("link", {
    name: "Continue",
  });

  private readonly deleteAccountMessage =
    this.page.getByText("Account Deleted!");

  async navigate() {
    await super.navigate("/signup");
  }

  async fillCompleteRegistration(details: RegisterDetails) {
    // title
    if (details.title == "Mr.") {
      await this.titleMrs.check();
    } else {
      await this.titleMrs.check();
    }

    //password
    await this.password.fill(details.password);

    // dayofbirth
    await this.dayDropdown.selectOption(details.day);
    await this.monthDropdown.selectOption(details.month);
    await this.yearDropdown.selectOption(details.year);

    //personal info
    await this.firstName.fill(details.firstname);
    await this.lastName.fill(details.lastname);

    if (details.company) {
      await this.company.fill(details.company);
    }

    await this.address1.fill(details.address1);
    if (details.address2) {
      await this.address2.fill(details.address2);
    }

    await this.country.selectOption(details.country);
    await this.state.fill(details.state);
    await this.city.fill(details.city);
    await this.zipcode.fill(details.zipcode);
    await this.mobileNumber.fill(details.mobilenumber);
  }

  async submitRegistration() {
    await this.createAccountButton.click();
  }

  async expectRegistrationSuccess() {
    await expect(this.successMessage).toBeVisible();
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async expectSuccesDeleteAccount() {
    await expect(this.deleteAccountMessage).toBeVisible();
  }
}
