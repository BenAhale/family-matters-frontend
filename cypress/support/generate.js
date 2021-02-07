import { build, fake } from "@jackfranklin/test-data-bot";

const userBuilder = build("User", {
  fields: {
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password()),
    first_name: fake((f) => f.internet.first_name()),
    last_name: fake((f) => f.internet.last_name()),
  },
});

export { userBuilder };
