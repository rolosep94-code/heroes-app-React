import { describe, expect, test } from "vitest";
import { SearchControls } from "./SearchControls";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

if (typeof window.ResizeObserver === 'undefined') {
    class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    window.ResizeObserver = ResizeObserver;
}

const renderWithRouter = (initialEntries: string[] = ['/']) => {

    return render(
        <MemoryRouter initialEntries = {initialEntries}>
            <SearchControls/>
        </MemoryRouter>
    )
}


describe('SearchControls', () => { 

    test('should render SearchControls with default values', () => { 

        const { container } = renderWithRouter();

        expect(container).toMatchSnapshot()

        // screen.debug();
     })

     test('should set input value when seatch param name is set', () => { 

        renderWithRouter(['/?name=Batman']);

        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');
        // screen.debug(input);

        expect(input.getAttribute('value')).toBe('Batman');


     })

     test('should change params when input is charged and enter is press', () => { 

        renderWithRouter(['/?name=Batman']);

        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');
        // screen.debug(input);

        expect(input.getAttribute('value')).toBe('Batman');

        fireEvent.change(input, {target: {value: 'Superman'} });
        fireEvent.keyDown(input, {key: 'Enter'});

        // screen.debug(input);

        expect(input.getAttribute('value')).toBe('Superman');

     })

     test('should change params strenght when slider is changed', () => { 

        renderWithRouter(['/?name=Batman&active-accordion=advance-filters']);

        const slider = screen.getByRole('slider');
        expect(slider.getAttribute('aria-valuenow')).toBe('0');

        fireEvent.keyDown(slider, {key: 'ArrowRight'});

        expect(slider.getAttribute('aria-valuenow')).toBe('1');

        // screen.debug(slider);

      })

      test('should accordion be open when active-accordion param is set', () => {

        renderWithRouter(['/?name=Batman&active-accordion=advance-filters']);

        const accordion = screen.getByTestId('accordion');
        const accordionItem = accordion.querySelector('div');

        expect(accordionItem?.getAttribute('data-state')).toBe('open');
       })

       test('should accordion be close when active-accordion param is not set', () => {

        renderWithRouter(['/?name=Batman']);

        const accordion = screen.getByTestId('accordion');
        const accordionItem = accordion.querySelector('div');

        expect(accordionItem?.getAttribute('data-state')).toBe('closed');
       })
 })