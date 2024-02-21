const mix = require("laravel-mix");
const exec = require("child_process").exec;
require("dotenv").config();

const glob = require("glob");
const path = require("path");

/*
 |--------------------------------------------------------------------------
 | Vendor assets
 |--------------------------------------------------------------------------
 */

function mixAssetsDir(query, cb) {
    (glob.sync("resources/" + query) || []).forEach((f) => {
        f = f.replace(/[\\\/]+/g, "/");
        cb(f, f.replace("resources", "public"));
    });
}

const sassOptions = {
    precision: 5,
    includePaths: ["node_modules", "resources/assets/"],
};

// // plugins Core stylesheets
// mixAssetsDir('sass/base/plugins/**/!(_)*.scss', (src, dest) =>
//   mix.sass(src, dest.replace(/(\\|\/)sass(\\|\/)/, '$1css$2').replace(/\.scss$/, '.css'), { sassOptions })
// )

// // pages Core stylesheets
// mixAssetsDir('sass/base/pages/**/!(_)*.scss', (src, dest) =>
//   mix.sass(src, dest.replace(/(\\|\/)sass(\\|\/)/, '$1css$2').replace(/\.scss$/, '.css'), { sassOptions })
// )

// Core stylesheets
mixAssetsDir("sass/base/core/**/!(_)*.scss", (src, dest) =>
    mix.sass(
        src,
        dest
            .replace(/(\\|\/)sass(\\|\/)/, "$1css$2")
            .replace(/\.scss$/, ".css"),
        { sassOptions }
    )
);

// script js
mixAssetsDir("js/scripts/**/*.js", (src, dest) => mix.scripts(src, dest));

mixAssetsDir("vendors/js/**/*.js", (src, dest) => mix.scripts(src, dest));
mixAssetsDir("vendors/css/**/*.css", (src, dest) => mix.copy(src, dest));
mixAssetsDir("vendors/**/**/images", (src, dest) => mix.copy(src, dest));
mixAssetsDir("vendors/css/editors/quill/fonts/", (src, dest) =>
    mix.copy(src, dest)
);
mixAssetsDir("fonts", (src, dest) => mix.copy(src, dest));
mixAssetsDir("fonts/**/**/*.css", (src, dest) => mix.copy(src, dest));
mix.copyDirectory("resources/images", "public/images");
mix.copyDirectory("resources/data", "public/data");

mix.js("resources/js/core/menu.js", "public/js/core")
    .js("resources/js/core/app.js", "public/js/core")
    .sass("resources/sass/core.scss", "public/css", { sassOptions })
    .sass("resources/sass/overrides.scss", "public/css", { sassOptions })
    .sass("resources/assets/scss/style.scss", "public/css", { sassOptions });

mix.disableNotifications()
