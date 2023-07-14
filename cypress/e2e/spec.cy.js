describe('Pruebas API', () => {
  it('Añadir mascota', () => {
    cy.request('POST', 'https://petstore.swagger.io/v2/pet', {
      id: 1,
      name: 'Firulais',
      status: 'available',
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('Buscar la mascota', () => {
    cy.request('GET', 'https://petstore.swagger.io/v2/pet/1').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.name).to.eq('Firulais')
      expect(response.body.status).to.eq('available')
    })
  })

  it('Actualizar nombre y status', () => {
    cy.request('PUT', 'https://petstore.swagger.io/v2/pet', {
      id: 1,
      name: 'Firulais',
      status: 'sold',
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('Buscar la mascota modificada', () => {
    cy.request('GET', 'https://petstore.swagger.io/v2/pet/findByStatus', {
      status: 'sold',
    }).then((response) => {
      expect(response.status).to.eq(200)
      const pets = response.body
      const soldPets = pets.filter(pet => pet.status === 'sold')
      expect(soldPets.length).to.eq(0)
    })
  })
})
