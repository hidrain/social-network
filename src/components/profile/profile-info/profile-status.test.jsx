import React from 'react'
import { create } from 'react-test-renderer';
import { ProfileStatus } from './profile-status';

//тест классовой компоненты
describe('ProfileStatus component', () => {
    test('status from props shoul be in the state', () => {
        const component = create(<ProfileStatus status='some status' />)
        const instance = component.getInstance()
        expect(instance.state.status).toBe('some status')
    })

    test('after creation <span> should be displayed', () => {
        const component = create(<ProfileStatus status='some status' />)
        const root = component.root
        let span = root.findByType('span')
        expect(span).not.toBeNull()
    })

    test(`after creation <input> shouldn't be displayed`, () => {
        const component = create(<ProfileStatus status='some status' />)
        const root = component.root
        expect(() => {
            let input = root.findByType('input')
        }).toThrow()
    })

    test('after creation <span> should contains correct status', () => {
        const component = create(<ProfileStatus status='some status' />)
        const root = component.root
        let span = root.findByType('span')
        expect(span.children[0]).toBe('some status')
    })

    test('<input> should be displayed in editModeinstead of <span>', () => {
        const component = create(<ProfileStatus status='some status' />)
        const root = component.root
        let span = root.findByType('span')
        span.props.onDoubleClick()
        let input = root.findByType('input')
        expect(input.props.value).toBe('some status')
    })

    test('callback should be called>', () => {
        const mockCallback = jest.fn()

        const component = create(<ProfileStatus status='some status' updateStatus={mockCallback} />)
        const instance = component.getInstance()
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})