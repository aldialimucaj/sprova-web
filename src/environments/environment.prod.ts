export const LABELS = {
  APP_NAME: "sprova"
}

export const environment = {
  production: false,
  API_URL: location.protocol + '//' + location.hostname + ":8181",
  JWT_TOKEN_NAME: "id_token",
  JWT_JSON_TOKEN_NAME: "id_json_token",
  GRAPHQL_PATH: "/graphql"
};


export const API_VERSIONS = {
  NONE: "",
  V1: "/api/v1"
}

export const API_PATH = "/api" + API_VERSIONS.NONE;

export const COMPONENTS = {
  USERS: "users",
  TESTCASES: "testcases",
  PROJECTS: "projects",
  CYCLES: "cycles",
  ARTIFACTS: "artifacts",
  TEST_SETS: "testsets",
  TEST_SET_EXECUTIONS: "testset-executions",
  EXECUTION_SETS: "executionsets",
  SUITES: "suites",
  SEARCH: "search",
  EXECUTIONS: "executions",
  REPORTS: "reports",
  STEPS: "steps",
  PARENTS: "parents",
  TESTCASESSTATS: "testcasesstats",
  CHILDREN: "children",
  FIND: "find",
}

export const PATHS = {
  ARTIFACTS: "/" + COMPONENTS.ARTIFACTS,
  USERS: "/" + COMPONENTS.USERS,
  TESTCASES: "/" + COMPONENTS.TESTCASES,
  PROJECTS: "/" + COMPONENTS.PROJECTS,
  CYCLES: "/" + COMPONENTS.CYCLES,
  TEST_SETS: "/" + COMPONENTS.TEST_SETS,
  TEST_SET_EXECUTIONS: "/" + COMPONENTS.TEST_SET_EXECUTIONS,
  SUITES: "/" + COMPONENTS.SUITES,
  SEARCH: "/" + COMPONENTS.SEARCH,
  EXECUTIONS: "/" + COMPONENTS.EXECUTIONS,
  REPORTS: "/" + COMPONENTS.REPORTS,
}

export const SUB_PATHS = {
  RUN_FOR: "runFor",
  EXECUTE: "execute",
  NEXT_PENDING: "next-pending",
  HAS_PENDING: "has-pending"
}

export const API = {
  API_URL: environment.API_URL,
  JWT_TOKEN_NAME: environment.JWT_TOKEN_NAME,
  ARTIFACTS: environment.API_URL + API_PATH + PATHS.ARTIFACTS,
  USERS: environment.API_URL + API_PATH + PATHS.USERS,
  PROJECTS: environment.API_URL + API_PATH + PATHS.PROJECTS,
  CYCLES: environment.API_URL + API_PATH + PATHS.CYCLES,
  TEST_SETS: environment.API_URL + API_PATH + PATHS.TEST_SETS,
  TEST_SET_EXECUTIONS: environment.API_URL + API_PATH + PATHS.TEST_SET_EXECUTIONS,
  SUITES: environment.API_URL + API_PATH + PATHS.SUITES,
  SEARCH: environment.API_URL + API_PATH + PATHS.SEARCH,
  TESTCASES: environment.API_URL + API_PATH + PATHS.TESTCASES,
  EXECUTIONS: environment.API_URL + API_PATH + PATHS.EXECUTIONS,
  REPORTS: environment.API_URL + API_PATH + PATHS.REPORTS,
  EXECUTION_STEPS: environment.API_URL + API_PATH + PATHS.EXECUTIONS + '/steps',
}
