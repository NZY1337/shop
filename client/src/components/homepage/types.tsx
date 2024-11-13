import { SxProps } from "@mui/material";

interface BaseElement {
    sx?: {
        [key: string]: SxProps;
    };
    text: string;
}

interface HeaderElement extends BaseElement {
    variant: 'h1' | 'h2' | 'h3' | 'h4';
}

interface SubtitleElement extends BaseElement {
    variant: 'h3' | 'h4' | 'h5';
}

interface ButtonElement extends BaseElement {
    variant: 'contained' | 'outlined' | 'text';
}

interface TextElement extends BaseElement {
    variant: 'body1' | 'body2';
}

interface ColumnElement {
    size: { md: number };
    className: string;
    sx?: {
        [key: string]: any;
    };
}

interface DataElement {
    header: HeaderElement;
    subtitle: SubtitleElement;
    text: TextElement;
    button: ButtonElement;
    column: ColumnElement;
}

export type DataArray = DataElement[];