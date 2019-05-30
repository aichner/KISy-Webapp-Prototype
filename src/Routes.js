import React from "react";
import { Route, Switch } from "react-router-dom";

// Pages
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import KisPage from "./pages/Kis";


// Templates
import NavigationNavPage from "./templates/NavigationNavPage";
import FormsNavPage from "./templates/FormsNavPage";
import TablesNavPage from "./templates/TablesNavPage";
import AddonsNavPage from "./templates/AddonsNavPage";
import ModalsNavPage from "./templates/ModalsNavPage";
import AdvancedNavPage from "./templates/AdvancedNavPage";
import ComponentsNavPage from "./templates/ComponentsNavPage";

// FREE
import AnimationPage from "./templates/AnimationPage";
import AlertPage from "./templates/AlertPage";
// import HomePage from "./templates/HomePage";
import ButtonPage from "./templates/ButtonPage";
import CSSNavPage from "./templates/CSSNavPage";
import TablePage from "./templates/TablePage";
import TableResponsivePage from "./templates/TableResponsivePage";
import TableScrollPage from "./templates/TableScrollPage";
import TableStylesPage from "./templates/TableStylesPage";
import BadgePage from "./templates/BadgePage";
import BreadcrumbPage from "./templates/BreadcrumbPage";
import FaPage from "./templates/FaPage";
import DatatablePage from "./templates/DatatablePage";
import DatatableApiPage from "./templates/DatatableApiPage";
import ModalPage from "./templates/ModalPage";
import ModalFormPage from "./templates/ModalFormPage";
import ModalExamplesPage from "./templates/ModalExamplesPage";
import ProgressPage from "./templates/ProgressPage";
import InputPage from "./templates/InputPage";
import MediaPage from "./templates/MediaPage";
import JumbotronPage from "./templates/JumbotronPage";
import NotificationPage from "./templates/NotificationPage";
import CardsPage from "./templates/CardsPage";
import PaginationPage from "./templates/PaginationPage";
import PopoverPage from "./templates/PopoverPage";
import ListGroupPage from "./templates/ListGroupPage";
import CarouselPage from "./templates/CarouselPage";
import PanelPage from "./templates/PanelPage";
import CollapsePage from "./templates/CollapsePage";
import TooltipsPage from "./templates/TooltipsPage";
import FooterPage from "./templates/FooterPage";
import MasksPage from "./templates/MasksPage";
import DropdownPage from "./templates/DropdownPage";
import VideoCarouselPage from "./templates/VideoCarouselPage";
import HoverPage from "./templates/HoverPage";
import FormsPage from "./templates/FormsPage";
import ChartsPage from "./templates/ChartsPage";
import SearchPage from "./templates/SearchPage";
import ValidationPage from "./templates/ValidationPage";
import NavbarPage from "./templates/NavbarPage";
import IframePage from "./templates/IframePage";
import EdgeHeaderPage from "./templates/EdgeHeaderPage"
import SpinnerPage from './templates/SpinnerPage';
import MasonryPage from './templates/MasonryPage';
import ScrollBarPage from './templates/ScrollBarPage';
import NavsPage from './templates/NavsPage';

// PRO-START
import SectionsNavPage from "./templates/pro/sections/SectionsNavPage";
import MaterialDropdownPage from "./templates/pro/DropdownPage";
import AutocompletePage from "./templates/pro/AutocompletePage";
import ButtonPagePro from "./templates/pro/ButtonPage";
import ChartsPagePro from "./templates/pro/ChartsPage";
import ChatPage from "./templates/pro/ChatPage";
import eCommercePage from "./templates/pro/eCommercePage";
import ChipsPage from "./templates/pro/ChipsPage";
import InputPagePro from "./templates/pro/InputPage";
import CollapsePagePro from "./templates/pro/CollapsePage";
import ScrollBarPagePro from "./templates/pro/ScrollBarPage";
import ScrollSpyPage from "./templates/pro/ScrollSpyPage";
import SelectPage from "./templates/pro/SelectPage";
import SideNavPage from "./templates/pro/SideNavPage";
import SlimSideNavPage from "./templates/pro/SlimSideNavPage";
import DatePickerPage from "./templates/pro/DatePickerPage";
import DoubleNavigationPage from "./templates/pro/DoubleNavigationPage";
import TimePickerPage from "./templates/pro/TimePickerPage";
import StickyPage from "./templates/pro/StickyPage";
import LightboxPage from "./templates/pro/LightboxPage";
import MultiCarouselPage from "./templates/pro/MultiCarouselPage";
import SpinnerPagePro from "./templates/pro/SpinnerPage";
import TabsPage from "./templates/pro/TabsPage";
import ThumbnailsCarousel from "./templates/pro/ThumbnailsCarousel";
import TestimonialsPage from "./templates/pro/sections/TestimonialsPage";
import TestimonialsMultiPage from "./templates/pro/sections/TestimonialsMultiPage";
import EcommercePage from "./templates/pro/sections/EcommercePage";
import AppPage from "./templates/pro/sections/AppPage";
import ContactFormPage from "./templates/pro/sections/ContactFormPage";
import ClassicFormPage from "./templates/pro/sections/ClassicFormPage";
import VideoBackgroundPage from "./templates/pro/sections/VideoBackgroundPage";
import ProjectsPage from "./templates/pro/sections/ProjectsPage";
import FeaturesPage from "./templates/pro/sections/FeaturesPage";
import ContactPage from "./templates/pro/sections/ContactPage";
import SocialButtonsPage from "./templates/pro/SocialButtonsPage";
import StepperPage from "./templates/pro/StepperPage";
import BlogPage from "./templates/pro/sections/BlogPage";
import TeamPage from "./templates/pro/sections/TeamPage";
import MagazinePage from "./templates/pro/sections/MagazinePage";
import SocialPage from "./templates/pro/sections/SocialPage";
import FormsPagePro from "./templates/pro/FormsPage";
import CardsPagePro from "./templates/pro/CardsPage";
import SearchPagePro from "./templates/pro/SearchPage";
import FooterPagePro from "./templates/pro/FooterPage";
import TableEditable from "./templates/pro/TableEditablePage";
import DatatableCsvPage from "./templates/pro/DatatableCsvPage";
import ModalFormProPage from "./templates/pro/ModalFormPage";
import HabmburgerMenuPage from "./templates/pro/HabmburgerMenuPage";
import TimelinePage from "./templates/pro/TimelinePage";
import SliderPage from "./templates/pro/SliderPage";
import StreakPage from "./templates/pro/StreakPage";
import ValidationPagePro from "./templates/pro/ValidationPage";
import FlippingCardsPage from "./templates/pro/FlippingCardsPage";
import TableStylesPagePro from "./templates/pro/TableStylesPage";
import ModalExamplesProPage from "./templates/pro/ModalExamplesPage";
import BlogComponentsPage from "./templates/pro/BlogComponentsPage";
import SmoothScrollPage from "./templates/pro/SmoothScrollPage";
import NavsPagePro from "./templates/pro/NavsPage";
import MinimalisticIntro from "./templates/pro/sections/MinimalisticIntro";
import ParallaxIntro from "./templates/pro/sections/ParallaxIntro";
import CallToActionIntro from "./templates/pro/sections/CallToActionIntro";
// PRO-END

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/kis" component={KisPage} />
        <Route exact path="/addons" component={AddonsNavPage} />
        <Route exact path="/advanced" component={AdvancedNavPage} />
        <Route exact path="/components" component={ComponentsNavPage} />
        <Route exact path="/css" component={CSSNavPage} />
        <Route exact path="/forms" component={FormsNavPage} />
        <Route exact path="/modals" component={ModalsNavPage} />
        <Route exact path="/navigation" component={NavigationNavPage} />
        <Route exact path="/tables" component={TablesNavPage} />

        {/* FREE */}
        <Route path="/addons/iframe" component={IframePage} />
        <Route path="/addons/edge-header" component={EdgeHeaderPage} />
        <Route path="/addons/pro/notification" component={NotificationPage} />
        <Route path="/advanced/carousel" component={CarouselPage} />
        <Route path="/advanced/collapse" component={CollapsePage} />
        <Route path="/advanced/videocarousel" component={VideoCarouselPage} />
        <Route path="/advanced/videocarousel" component={VideoCarouselPage} />
        <Route path="/advanced/alerts" component={AlertPage} />
        <Route path="/advanced/popover" component={PopoverPage} />
        <Route path="/advanced/tooltips" component={TooltipsPage} />
        <Route path="/advanced/charts" component={ChartsPage} />
        <Route path="/advanced/scrollbar" component={ScrollBarPage} />
        <Route path="/css/animations" component={AnimationPage} />
        <Route path="/css/icons" component={FaPage} />
        <Route path="/css/jumbotron" component={JumbotronPage} />
        <Route path="/css/masks" component={MasksPage} />
        <Route path="/css/hover" component={HoverPage} />
        <Route path="/css/masonry" component={MasonryPage} />
        <Route path="/components/media" component={MediaPage} />
        <Route path="/components/badge" component={BadgePage} />
        <Route path="/components/cards" component={CardsPage} />
        <Route path="/components/buttons" component={ButtonPage} />
        <Route path="/components/dropdown" component={DropdownPage} />
        <Route path="/components/progress" component={ProgressPage} />
        <Route path="/components/pagination" component={PaginationPage} />
        <Route path="/components/list-group" component={ListGroupPage} />
        <Route path="/components/panels" component={PanelPage} />
        <Route path="/components/search" component={SearchPage} />
        <Route path="/components/spinner" component={SpinnerPage} />
        <Route path="/forms/forms" component={FormsPage} />
        <Route path="/forms/validation" component={ValidationPage} />
        <Route path="/forms/input" component={InputPage} />
        <Route path="/modals/modal" component={ModalPage} />
        <Route path="/modals/modal-form" component={ModalFormPage} />
        <Route path="/modals/modal-examples" component={ModalExamplesPage} />
        <Route path="/navigation/navbar" component={NavbarPage} />
        <Route path="/navigation/breadcrumb" component={BreadcrumbPage} />
        <Route path="/navigation/navs" component={NavsPage} />
        <Route path="/navigation/footer" component={FooterPage} />
        <Route path="/tables/table" component={TablePage} />
        <Route path="/tables/table-responsive" component={TableResponsivePage} />
        <Route path="/tables/table-scroll" component={TableScrollPage} />
        <Route path="/tables/table-styles" component={TableStylesPage} />
        <Route path="/tables/datatable-api" component={DatatableApiPage} />
        <Route path="/tables/datatable" component={DatatablePage} />
        {/* PRO-START */}
        <Route exact path="/sections" component={SectionsNavPage} />
        <Route path="/addons/pro/flipping-cards" component={FlippingCardsPage} />
        <Route path="/addons/pro/timeline" component={TimelinePage} />
        <Route path="/addons/pro/streak" component={StreakPage} />
        <Route path="/addons/pro/chat" component={ChatPage} />
        <Route path="/addons/pro/e-commerce-components" component={eCommercePage} />
        <Route path="/addons/pro/blog-components" component={BlogComponentsPage} />
        <Route path="/advanced/pro/smoothscroll" component={SmoothScrollPage} />
        <Route path="/advanced/pro/scrollbar" component={ScrollBarPagePro} />
        <Route path="/advanced/pro/lightbox" component={LightboxPage} />
        <Route path="/advanced/pro/charts" component={ChartsPagePro} />
        <Route path="/advanced/pro/sticky" component={StickyPage} />
        <Route path="/advanced/pro/thumbnailscarousel" component={ThumbnailsCarousel} />
        <Route path="/advanced/pro/collapse" component={CollapsePagePro} />
        <Route path="/advanced/pro/multicarousel" component={MultiCarouselPage} />
        <Route path="/components/pro/dropdown" component={MaterialDropdownPage} />
        <Route path="/components/pro/spinner" component={SpinnerPagePro} />
        <Route path="/components/pro/chips" component={ChipsPage} />
        <Route path="/components/pro/tabs" component={TabsPage} />
        <Route path="/components/pro/socialbuttons" component={SocialButtonsPage} />
        <Route path="/components/pro/buttons" component={ButtonPagePro} />
        <Route path="/components/pro/cards" component={CardsPagePro} />
        <Route path="/components/pro/stepper" component={StepperPage} />
        <Route path="/components/pro/search" component={SearchPagePro} />
        <Route path="/forms/pro/autocomplete" component={AutocompletePage} />
        <Route path="/forms/pro/input" component={InputPagePro} />
        <Route path="/forms/pro/select" component={SelectPage} />
        <Route path="/forms/pro/forms" component={FormsPagePro} />
        <Route path="/forms/pro/validation" component={ValidationPagePro} />
        <Route path="/forms/pro/datepicker" component={DatePickerPage} />
        <Route path="/forms/pro/timepicker" component={TimePickerPage} />
        <Route path="/forms/pro/slider" component={SliderPage} />
        <Route path="/modals/pro/modal-form" component={ModalFormProPage} />
        <Route path="/modals/pro/modal-examples" component={ModalExamplesProPage} />
        <Route path="/navigation/pro/sidenav" component={SideNavPage} />
        <Route path="/navigation/pro/slim-sidenav" component={SlimSideNavPage} />
        <Route path="/navigation/pro/scrollspy" component={ScrollSpyPage} />
        <Route path="/navigation/pro/hamburger-menu" component={HabmburgerMenuPage} />
        <Route path="/navigation/pro/double" component={DoubleNavigationPage} />
        <Route path="/navigation/pro/footer" component={FooterPagePro} />
        <Route path="/navigation/pro/navs" component={NavsPagePro} />
        <Route path="/sections/testimonials" component={TestimonialsPage} />
        <Route path="/sections/testimonialsMulti" component={TestimonialsMultiPage} />
        <Route path="/sections/ecommerce" component={EcommercePage} />
        <Route path="/sections/app" component={AppPage} />
        <Route path="/sections/contactform" component={ContactFormPage} />
        <Route path="/sections/classicform" component={ClassicFormPage} />
        <Route path="/sections/videobackground" component={VideoBackgroundPage} />
        <Route path="/sections/projects" component={ProjectsPage} />
        <Route path="/sections/features" component={FeaturesPage} />
        <Route path="/sections/contact" component={ContactPage} />
        <Route path="/sections/blog" component={BlogPage} />
        <Route path="/sections/team" component={TeamPage} />
        <Route path="/sections/magazine" component={MagazinePage} />
        <Route path="/sections/social" component={SocialPage} />
        <Route path="/sections/minimalistic-intro" component={MinimalisticIntro} />
        <Route path="/sections/parallax-intro" component={ParallaxIntro} />
        <Route path="/sections/call-to-action-intro" component={CallToActionIntro} />
        <Route path="/tables/pro/tableeditable" component={TableEditable} />
        <Route path="/tables/pro/table-styles" component={TableStylesPagePro} />
        <Route path="/tables/pro/datatable-csv" component={DatatableCsvPage} />
        {/* PRO-END */}
        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
