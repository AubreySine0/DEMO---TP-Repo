const core = require('@actions/core');
const pkg = tools.getPackageJSON();


const contents = await tools.readFile('src/analytics-autogenerated/plan.json');