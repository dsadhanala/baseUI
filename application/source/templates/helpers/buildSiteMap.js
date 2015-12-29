"use strict";
(function(name, definition) {
    if (typeof exports === 'object') {
        if (typeof module === 'object' && typeof module.exports === 'object' ) {
            module.exports = definition;
        }
        exports[name] = definition;
        return;
    }
    this[name] = definition;

}('handlebars-helper-buildSiteMap', function buildSiteMap() {
    var pages          = this.app.views.pages;

    // build the HTML content
    var displaySitemap = buildHTML();

    /**
     * Prepare categories with pages list
     */
    function prepareCategories() {
        var categories = {},
            page,
            pagesData;

        // iterator to build categories
        for (page in pages) {
            pagesData = pages[page].data;

            if (pages.hasOwnProperty(page) && pagesData.title !== undefined) {
                // check if already defined with category or not
                if(categories[pagesData.category] === undefined){
                    categories[pagesData.category] = { list: [] };
                }

                // build pages list for each category
                listItemsforCategory(categories[pagesData.category], pagesData);
            }
        }

        // return the categories
        return categories;
    }

    /**
     * Build list of pages for each category
     * @param  {Object} category
     * @param  {Object} pagesData
     */
    function listItemsforCategory(category, pagesData) {
        category.list.push({'title': pagesData.title, 'URL': pagesData.dest.name+'.html'});
    }

    /**
     * Build the HTML
     * @return {String} concatinated HTML elements
     */
    function buildHTML() {
        var sectionHead,
            sectionBody,
            sectionFooter,
            category,
            pagesListWithSections = [];

        // prepare list
        var categories = prepareCategories();

        // iterator to build each category section
        for (category in categories) {
            if (categories.hasOwnProperty(category)) {
                sectionHead   = '<section class ="block-section"><h2>'+ category +'</h2><ul>';
                sectionBody   = buildSectionBody(categories[category].list);
                sectionFooter = '</ul></section>';

                pagesListWithSections.push(sectionHead+sectionBody+sectionFooter);
            }
        }

        // set the sections
        return pagesListWithSections.join(' ');
    }

    /**
     * buildSectionBody will build the pages list part of the section body
     * @param  {Array} list of objects with Page title and URL
     * @return {String} once the list built it will concatinated into string
     */
    function buildSectionBody(list) {
        var i = 0,
            listLength = list.length,
            pageList = [];

        for(i; i < listLength; i++){
            pageList.push('<li><a href="'+ list[i].URL +'">'+ list[i].title +'</a></li>');
        }
        return pageList.join(' ');
    }

    // return the pages list section
    return displaySitemap;
}));
