const Handlebars = require('handlebars')

module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default'
        const icons = {
            default: "oi oi-elevator",
            asc: "oi oi-sort-ascending",
            desc: "oi oi-sort-descending"
        };
        const icon = icons[sortType];
        const types = {
            default: "desc",
            asc: "desc",
            desc: "asc"
        }

        const type = types[sortType];
        const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)
        const output = `<a href="${href}">
            <span class="${icon}"></span></a>
        `
        return new Handlebars.SafeString(output)
    }
};