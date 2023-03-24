import '@testing-library/jest-dom/extend-expect';

window.IntersectionObserver = jest.fn().mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
});
