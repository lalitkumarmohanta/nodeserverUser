module.exports = {
    normalizeErrors: function (errors) {
        let normalizeError = [];
        for (let property in errors) {
            if (errors.hasOwnProperty(property)) {
                normalizeError.push({ title: property, detail: errors[property].message });
            }
        }
        return normalizeError;
    }
}