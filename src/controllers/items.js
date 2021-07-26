const methods = {
    async list(request, response) {
        response.status(200).json({
            title: 'Cheiro verde, verdinho' 
        })
    }
}

module.exports = methods