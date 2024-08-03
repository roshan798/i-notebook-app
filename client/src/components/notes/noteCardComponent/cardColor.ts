// using hex color values
export type Color = {
    name: string;
    value: string;
    textColor: string;
    chipText?: string;
    titleColor?: string;
    contentColor?: string;
    checklistTextColor?: string;
    iconColor?: string;
}

export const colorMap: Record<string, Color> = {
    "default": {
        name: "default",
        value: '', 
        textColor: '',
        chipText: '',
        titleColor: '',
        contentColor: '',
        checklistTextColor: '',
        iconColor: ''
    },
    'Soft Blue': {
        name: 'Soft Blue',
        value: '#a8dadcd0',
        textColor: '#000000de',
        chipText: '#000000c0',
        titleColor: '#000000f2',
        contentColor: '#000000de',
        checklistTextColor: '#000000de',
        iconColor: '#000000de'
    },
    'Coral': {
        name: 'Coral',
        value: '#ff6f61cc',
        textColor: '#ffffffde',
        chipText: '#ffffffc0',
        titleColor: '#fffffff2',
        contentColor: '#ffffffde',
        checklistTextColor: '#ffffffde',
        iconColor: '#ffffffde'
    },
    'Mint Green': {
        name: 'Mint Green',
        value: '#b9fbc0cc',
        textColor: '#000000de',
        chipText: '#000000c0',
        titleColor: '#000000f2',
        contentColor: '#000000de',
        checklistTextColor: '#000000de',
        iconColor: '#000000de'
    },
    'Lavender': {
        name: 'Lavender',
        value: '#cda4ded0',
        textColor: '#000000de',
        chipText: '#000000c0',
        titleColor: '#000000f2',
        contentColor: '#000000de',
        checklistTextColor: '#000000de',
        iconColor: '#000000de'
    },
    'Peach': {
        name: 'Peach',
        value: '#ffcbf2cc',
        textColor: '#000000de',
        chipText: '#000000c0',
        titleColor: '#000000f2',
        contentColor: '#000000de',
        checklistTextColor: '#000000de',
        iconColor: '#000000de'
    },
    'Slate Gray': {
        name: 'Slate Gray',
        value: '#708090cc',
        textColor: '#ffffffde',
        chipText: '#ffffffc0',
        titleColor: '#fffffff2',
        contentColor: '#ffffffde',
        checklistTextColor: '#ffffffde',
        iconColor: '#ffffffde'
    },
    'Light Steel Blue': {
        name: 'Light Steel Blue',
        value: '#b0c4ded0',
        textColor: '#000000de',
        chipText: '#000000c0',
        titleColor: '#000000f2',
        contentColor: '#000000de',
        checklistTextColor: '#000000de',
        iconColor: '#000000de'
    },
    'Sandy Brown': {
        name: 'Sandy Brown',
        value: '#f4a460cc',
        textColor: '#000000de',
        chipText: '#000000c0',
        titleColor: '#000000f2',
        contentColor: '#000000de',
        checklistTextColor: '#000000de',
        iconColor: '#000000de'
    },
    'Light Salmon': {
        name: 'Light Salmon',
        value: '#ffa07acc',
        textColor: '#000000de',
        chipText: '#000000c0',
        titleColor: '#000000f2',
        contentColor: '#000000de',
        checklistTextColor: '#000000de',
        iconColor: '#000000de'
    },
    'Royal Blue': {
        name: 'Royal Blue',
        value: '#4169e1cc',
        textColor: '#ffffffde',
        chipText: '#ffffffc0',
        titleColor: '#fffffff2',
        contentColor: '#ffffffde',
        checklistTextColor: '#ffffffde',
        iconColor: '#ffffffde'
    },
    'Alice Blue': {
        name: 'Alice Blue',
        value: '#f0f8ffcc',
        textColor: '#000000de',
        chipText: '#000000c0',
        titleColor: '#000000f2',
        contentColor: '#000000de',
        checklistTextColor: '#000000de',
        iconColor: '#000000de'
    },
    'Neon Purple': {
        name: 'Neon Purple',
        value: '#b24cffd0',
        textColor: '#ffffffde',
        chipText: '#ffffffc0',
        titleColor: '#ffffffff',
        contentColor: '#ffffffde',
        checklistTextColor: '#ffffffde',
        iconColor: '#ffffffde'
    }, 'Electric Green': {
        name: 'Electric Green',
        value: '#39ff14d0',
        textColor: '#000000de',
        chipText: '#000000c0',
        titleColor: '#000000f2',
        contentColor: '#000000de',
        checklistTextColor: '#000000de',
        iconColor: '#000000de'
    }, 'Cyber Blue': {
        name: 'Cyber Blue',
        value: '#00e5ffd0',
        textColor: '#000000de',
        chipText: '#000000c0',
        titleColor: '#000000f2',
        contentColor: '#000000de',
        checklistTextColor: '#000000de',
        iconColor: '#000000de'
    }, 'Ultraviolet': {
        name: 'Ultraviolet',
        value: '#6e00ffd0',
        textColor: '#ffffffde',
        chipText: '#ffffffc0',
        titleColor: '#ffffffff',
        contentColor: '#ffffffde',
        checklistTextColor: '#ffffffde',
        iconColor: '#ffffffde'
    }
};
