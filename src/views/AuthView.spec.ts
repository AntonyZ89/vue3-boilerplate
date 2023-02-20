import { XButton, XInput, XPage } from "@/components";
import i18n from "@/i18n";
import { router } from "@/router";
import { useUserStore } from "@/stores";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { VueWrapper, config, flushPromises, mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import waitForExpect from "wait-for-expect";
import AuthView from "./AuthView.vue";

config.global.plugins = [i18n];

config.global.components = {
  XPage,
  XInput,
  XButton,
  FontAwesomeIcon,
};

library.add(fab, fas, far);

const ELEMENTS = {
  LOGIN_BUTTON: "button[data-test=login]",
  SIGNUP_BUTTON: "button[data-test=signup]",
  USERNAME_INPUT: "input#username",
  PASSWORD_INPUT: "input#password",
};

describe("AuthView", () => {
  let wrapper: VueWrapper<InstanceType<typeof AuthView>>;

  beforeEach(() => {
    wrapper = mount(AuthView, {
      global: {
        plugins: [createPinia(), router],
      },
    });
  });

  afterEach(() => wrapper.unmount());

  it("renders correctly", () => {
    expect(wrapper.find("h1").text()).toBe("Log In");

    expect(wrapper.find(ELEMENTS.USERNAME_INPUT).exists()).toBe(true);
    expect(wrapper.find(ELEMENTS.PASSWORD_INPUT).exists()).toBe(true);

    expect(wrapper.find(ELEMENTS.LOGIN_BUTTON).exists()).toBe(true);
    expect(wrapper.find(ELEMENTS.SIGNUP_BUTTON).exists()).toBe(true);
  });

  describe("signup", () => {
    it("should successfully signup", async () => {
      const userStore = useUserStore();

      const signupButton = wrapper.find(ELEMENTS.SIGNUP_BUTTON);
      const username = wrapper.find<HTMLInputElement>(ELEMENTS.USERNAME_INPUT);
      const password = wrapper.find<HTMLInputElement>(ELEMENTS.PASSWORD_INPUT);

      await username.setValue("antony");
      await password.setValue("10203040");

      expect(username.element.value).toBe("antony");
      expect(password.element.value).toBe("10203040");

      await signupButton.trigger("click"); // handle click to set type of submit ( LOGIN or SIGNUP )
      await signupButton.trigger("submit");

      // wait for the promises to fulfill
      await flushPromises();

      await waitForExpect(() => {
        expect(userStore.users.length).toBe(1); // expect "1" on "0"
        expect(userStore.users[0].name).toBe("antony");
      });
    });

    it("should not signup", async () => {
      const signupButton = wrapper.find(ELEMENTS.SIGNUP_BUTTON);
      const username = wrapper.find<HTMLInputElement>(ELEMENTS.USERNAME_INPUT);
      const password = wrapper.find<HTMLInputElement>(ELEMENTS.PASSWORD_INPUT);

      const usernameError = username.element.nextSibling;
      const passwordError = password.element.nextSibling;

      await username.setValue("test");
      await password.setValue("123");

      expect(username.element.value).toBe("test");
      expect(password.element.value).toBe("123");

      await signupButton.trigger("click"); // handle click to set type of submit ( LOGIN or SIGNUP )
      await signupButton.trigger("submit");

      // wait for the promises to fulfill
      await flushPromises();

      await waitForExpect(() => {
        expect(usernameError?.textContent?.trim()).to.be.empty;
        expect(passwordError?.textContent).toEqual(
          "Password must be at least 6 characters"
        );
      });
    });
  });
});
