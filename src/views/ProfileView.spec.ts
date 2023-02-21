import { XButton, XInput, XPage } from "@/components";
import i18n from "@/i18n";
import { useGlobalStore } from "@/stores";
import type { UserType } from "@/types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createTestingPinia } from "@pinia/testing";
import { VueWrapper, config, flushPromises, mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import waitForExpect from "wait-for-expect";
import ProfileView from "./ProfileView.vue";

config.global.plugins = [i18n];

config.global.components = {
  XPage,
  XInput,
  XButton,
  FontAwesomeIcon,
};

library.add(fab, fas, far);

const ELEMENTS = {
  NAME_INPUT: "input#name",
  PASSWORD_INPUT: "input#password",
  UPDATE_BUTTON: "button[data-test=update]",
};

describe("ProfileView", () => {
  let wrapper: VueWrapper<InstanceType<typeof ProfileView>>;

  beforeEach(() => {
    const user: UserType = {
      id: 1,
      name: "Antony",
      password: "123456",
    };

    const pinia = createTestingPinia({
      stubActions: false,
      initialState: {
        global: { user },
        user: { users: [user] },
      },
    });

    wrapper = mount(ProfileView, {
      global: { plugins: [pinia] },
    });
  });

  afterEach(() => wrapper.unmount());

  it("should render successfully", async () => {
    const name = wrapper.find<HTMLInputElement>(ELEMENTS.NAME_INPUT);
    const password = wrapper.find<HTMLInputElement>(ELEMENTS.PASSWORD_INPUT);
    const updateButton = wrapper.find(ELEMENTS.UPDATE_BUTTON);

    expect(name.exists()).toBe(true);
    expect(password.exists()).toBe(true);
    expect(updateButton.exists()).toBe(true);

    expect(name.element.value).toBe("Antony");
    expect(password.element.value).toBe("");
  });

  it("should update user name", async () => {
    const globalStore = useGlobalStore();

    const name = wrapper.find<HTMLInputElement>(ELEMENTS.NAME_INPUT);
    const updateButton = wrapper.find(ELEMENTS.UPDATE_BUTTON);

    await name.setValue("AntonyDEV");
    expect(name.element.value).toBe("AntonyDEV");

    await updateButton.trigger("submit");

    await flushPromises();

    await waitForExpect(() => {
      expect(globalStore.user?.password).toBe("123456");
      expect(globalStore.user?.name).toBe("AntonyDEV");
    });
  });

  it("should update user password", async () => {
    const globalStore = useGlobalStore();

    const password = wrapper.find<HTMLInputElement>(ELEMENTS.PASSWORD_INPUT);
    const updateButton = wrapper.find(ELEMENTS.UPDATE_BUTTON);

    await password.setValue("10203040");
    expect(password.element.value).toBe("10203040");

    await updateButton.trigger("submit");

    await flushPromises();

    await waitForExpect(() => {
      expect(globalStore.user?.password).toBe("10203040");
    });
  });
});
