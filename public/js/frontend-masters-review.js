import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import toggleNav from './modules/nav';
import toggleSearch from './modules/search';
import typeAhead from './modules/typeAhead';


// toggleNav($('#nav'), $('#toggleButton'), $('#backdrop'));
toggleNav($('#nav'), $$('.toggleNav'));
toggleSearch($('#searchButton'), $('#nav'), $$('.toggleNav'), $('#searchInput'), $('.search-container'));

typeAhead($('.search'));