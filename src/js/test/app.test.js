import { render, screen, fireEvent } from '@testing-library/react';
import App from '../main/App';

describe('App Component Tests', () => {

    test('renders HouseTrack title', () => {
        render(<App />);
        const titleElement = screen.getByText(/HouseTrack/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('toggles Active Tasks', () => {
        render(<App />);
        const toggleElement = screen.getByText('Active Tasks').parentNode.querySelector('.icon-right');
        fireEvent.click(toggleElement);
        const chevronRightIcon = screen.getByTestId('ChevronDoubleRight');
        expect(chevronRightIcon).toBeInTheDocument();
    });

    test('toggles Completed Tasks', () => {
        render(<App />);
        const toggleElement = screen.getByText('Completed Tasks').parentNode.querySelector('.icon-right');
        fireEvent.click(toggleElement);
        const chevronRightIcon = screen.getByTestId('ChevronDoubleRight');
        expect(chevronRightIcon).toBeInTheDocument();
    });

    test('toggles Recurring Tasks', () => {
        render(<App />);
        const toggleElement = screen.getByText('Recurring Tasks').parentNode.querySelector('.icon-right');
        fireEvent.click(toggleElement);
        const chevronRightIcon = screen.getByTestId('ChevronDoubleRight');
        expect(chevronRightIcon).toBeInTheDocument();
    });

    // add more

});
