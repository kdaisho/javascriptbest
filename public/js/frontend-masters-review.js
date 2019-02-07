import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import toggleNav from './modules/nav';
import toggleSearch from './modules/search';
import typeAhead from './modules/typeAhead';

toggleNav($('#nav'), $('#hamburger'), $('#backdrop'));
toggleSearch($('#searchButton'), $('#nav'), $('#hamburger'), $('#backdrop'), $('#searchInput'), $('.search-container'), $('.search-results'));
typeAhead($('.search'));