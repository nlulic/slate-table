import {
  DEFAULT_WITH_TABLE_OPTIONS as defaultOptions,
  WithTableOptions,
} from "../../src/options";

export const DEFAULT_TEST_WITH_TABLE_OPTIONS = {
  ...defaultOptions,
  withNormalization: false,
} as const satisfies WithTableOptions;
