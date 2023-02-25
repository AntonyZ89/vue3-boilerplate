import { XButton, XPage, XTable } from "@/components";
import i18n from "@/i18n";
import { router } from "@/router";
import type { UserType } from "@/types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createTestingPinia } from "@pinia/testing";
import { config, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import IndexView from "./IndexView.vue";

config.global.plugins = [i18n];

config.global.components = {
  XPage,
  XButton,
  FontAwesomeIcon,
  XTable,
};

library.add(fab, fas, far);

const user: UserType = {
  id: 1,
  name: "test",
  password: "test",
};

describe("IndexView", () => {
  it("should list users", () => {
    const pinia = createTestingPinia({
      initialState: {
        user: {
          users: [user],
        },
      },
    });

    const wrapper = mount(IndexView, {
      global: {
        plugins: [pinia, router],
      },
    });

    const rows = wrapper.findAll("tbody > tr");

    const firstRow = rows.at(0)!;

    expect(rows.length).toBe(1);
    expect(firstRow.find("td:nth-child(1)").text()).toEqual(user.id.toString());
    expect(firstRow.find("td:nth-child(2)").text()).toEqual(user.name);
  });
});
