import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    jest.spyOn(global, 'fetch')
      .mockResolvedValue( { json: jest.fn().mockResolvedValue(responseAPI) })
    
    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    const cardTitleEl = await screen.findByRole('heading', { 
      name: /Rick Sanchez/i , level: 3
    });

    expect(cardTitleEl).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const inputEl = screen.getByRole('textbox', {placeholder: /Rick Sanchez.../i });
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveValue('');

    const submitBtn = screen.getByRole('button', { name: /Buscar/i });
    expect(submitBtn).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', async () => {
    const inputEl = screen.getByRole('textbox', {placeholder: /Rick Sanchez.../i });
    userEvent.type(inputEl, 'smith');
    expect(inputEl).toHaveValue('smith');

    const submitBtn = screen.getByRole('button', { name: /Buscar/i });
    userEvent.click(submitBtn);

    const cardsEl = await screen.findAllByRole('article', {className: 'card'});
    expect(cardsEl).toHaveLength(4);
  })
})
