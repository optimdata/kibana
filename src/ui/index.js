module.exports = async (kbnServer, server, config) => {
  let { defaults } = require('lodash');
  let Boom = require('boom');
  let formatUrl = require('url').format;
  let { resolve } = require('path');
  let readFile = require('fs').readFileSync;

  let fromRoot = require('../utils/fromRoot');
  let UiExports = require('./UiExports');
  let UiBundle = require('./UiBundle');
  let UiBundleCollection = require('./UiBundleCollection');
  let UiBundlerEnv = require('./UiBundlerEnv');

  let loadingGif = 'imagesBank/kibana/loading.gif';

  if (!config.has('kibana.images_bank') || (config.get('kibana.images_bank') === 'ui/images')) {
    loadingGif = readFile(fromRoot('src/ui/public/loading.gif'), { encoding: 'base64'});
    loadingGif = 'data:image/gif;base64,' + loadingGif;
  }

  let uiExports = kbnServer.uiExports = new UiExports({
    urlBasePath: config.get('server.basePath')
  });

  let bundlerEnv = new UiBundlerEnv(config.get('optimize.bundleDir'));
  bundlerEnv.addContext('env', config.get('env.name'));
  bundlerEnv.addContext('urlBasePath', config.get('server.basePath'));
  bundlerEnv.addContext('sourceMaps', config.get('optimize.sourceMaps'));
  bundlerEnv.addContext('kbnVersion', config.get('pkg.version'));
  bundlerEnv.addContext('buildNum', config.get('pkg.buildNum'));
  uiExports.addConsumer(bundlerEnv);

  for (let plugin of kbnServer.plugins) {
    uiExports.consumePlugin(plugin);
  }

  let bundles = kbnServer.bundles = new UiBundleCollection(bundlerEnv, config.get('optimize.bundleFilter'));

  for (let app of uiExports.getAllApps()) {
    bundles.addApp(app);
  }

  for (let gen of uiExports.getBundleProviders()) {
    let bundle = await gen(UiBundle, bundlerEnv, uiExports.getAllApps());
    if (bundle) bundles.add(bundle);
  }

  // render all views from the ui/views directory
  server.setupViews(resolve(__dirname, 'views'));

  server.route({
    path: '/app/{id}',
    method: 'GET',
    handler: function (req, reply) {
      let id = req.params.id;
      let app = uiExports.apps.byId[id];
      if (!app) return reply(Boom.notFound('Unknown app ' + id));

      if (kbnServer.status.isGreen()) {
        return reply.renderApp(app);
      } else {
        return reply.renderStatusPage();
      }
    }
  });

  const defaultInjectedVars = {};
  if (config.has('kibana')) {
    defaultInjectedVars.kbnIndex = config.get('kibana.index');
  }
  if (config.has('elasticsearch')) {
    defaultInjectedVars.esShardTimeout = config.get('elasticsearch.shardTimeout');
    defaultInjectedVars.esApiVersion = config.get('elasticsearch.apiVersion');
  }

  server.decorate('reply', 'renderApp', function (app) {
    const payload = {
      app: app,
      nav: uiExports.apps,
      version: kbnServer.version,
      buildNum: config.get('pkg.buildNum'),
      buildSha: config.get('pkg.buildSha'),
      basePath: config.get('server.basePath'),
      vars: defaults(app.getInjectedVars(), defaultInjectedVars),
    };

    return this.view(app.templateName, {
      app: app,
      loadingGif: loadingGif,
      kibanaPayload: payload,
      bundlePath: `${config.get('server.basePath')}/bundles`,
    });
  });
};
