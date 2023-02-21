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
import CreateView from "./CreateView.vue";

config.global.plugins = [i18n];

config.global.components = {
  XPage,
  XButton,
  FontAwesomeIcon,
  XInput,
};

library.add(fab, fas, far);

const ELEMENTS = {
  SUBMIT_BUTTON: "button[data-test=update]",
  USERNAME_INPUT: "input#name",
  PASSWORD_INPUT: "input#password",
};

describe("CreateView", () => {
  let wrapper: VueWrapper<InstanceType<typeof CreateView>>;

  beforeEach(() => {
    wrapper = mount(CreateView, {
      global: {
        plugins: [createPinia(), router],
      },
    });
  });

  afterEach(() => wrapper.unmount());

  it("should create user successfully", async () => {
    const userStore = useUserStore();

    const name = wrapper.find<HTMLInputElement>(ELEMENTS.USERNAME_INPUT);
    const password = wrapper.find<HTMLInputElement>(ELEMENTS.PASSWORD_INPUT);

    name.setValue("test");
    password.setValue("10203040");

    await wrapper.find(ELEMENTS.SUBMIT_BUTTON).trigger("submit");

    expect(name.element.value).toBe("test");
    expect(password.element.value).toBe("10203040");

    await flushPromises();

    await waitForExpect(() => {
      expect(userStore.users.length).toBe(1);
      expect(userStore.users[0].name).toBe("test");
      expect(userStore.users[0].password).toBe("10203040");
    });
  });

  it("should not create user with empty fields", async () => {
    const userStore = useUserStore();

    const name = wrapper.find<HTMLInputElement>(ELEMENTS.USERNAME_INPUT);
    const password = wrapper.find<HTMLInputElement>(ELEMENTS.PASSWORD_INPUT);

    name.setValue("");
    password.setValue("");

    await wrapper.find(ELEMENTS.SUBMIT_BUTTON).trigger("submit");

    expect(name.element.value).toBe("");
    expect(password.element.value).toBe("");

    await flushPromises();

    await waitForExpect(() => {
      expect(name.element.nextSibling?.textContent).toBe(
        "Name is a required field"
      );
      expect(password.element.nextSibling?.textContent).toBe(
        "Password is a required field"
      );
      expect(userStore.users.length).toBe(0);
    });
  });

  it("should not create user with invalid password", async () => {
    const userStore = useUserStore();

    const name = wrapper.find<HTMLInputElement>(ELEMENTS.USERNAME_INPUT);
    const password = wrapper.find<HTMLInputElement>(ELEMENTS.PASSWORD_INPUT);

    name.setValue("AntonyDEV");
    password.setValue("123");

    await wrapper.find(ELEMENTS.SUBMIT_BUTTON).trigger("submit");

    expect(name.element.value).toBe("AntonyDEV");
    expect(password.element.value).toBe("123");

    await flushPromises();

    await waitForExpect(() => {
      expect(password.element.nextSibling?.textContent).toBe(
        "Password must be at least 6 characters"
      );
      expect(userStore.users.length).toBe(0);
    });
  });
});
