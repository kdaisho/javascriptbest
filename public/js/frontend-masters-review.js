import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import toggleNav from './modules/nav';
import toggleSearch from './modules/search';
import typeAhead from './modules/typeAhead';
import ajaxLike from './modules/like';
import handleFlash from './modules/handleFlash';
import formValidate from './modules/formValidate';
import ratingValidate from './modules/ratingValidate';
import showForgotPassword from './modules/showForgotPassword';

toggleNav($('#nav'), $('#hamburger'), $('#backdrop'));
toggleSearch($('#searchButton'), $('#nav'), $('#hamburger'), $('#backdrop'), $('#searchInput'), $('.search-container'), $('.search-results'));
typeAhead($('.search'));
handleFlash($('#flashMsg'));
formValidate($$('.required'));
ratingValidate($$('.rating'), $('#submitReview'), $('.reviewer'), $('.reviewer__error'));
showForgotPassword($('.forgotPassword'), $$('.loginForm'), $('.forgotPasswordForm'));
const likeForms = $$('form.like');
likeForms.on('submit', ajaxLike);