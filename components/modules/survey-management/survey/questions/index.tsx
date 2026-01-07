import dynamic from "next/dynamic";

export const questionFeatureComponents = {
    Category: dynamic(
        () =>
            import("./category").then(
                (mod) => mod.Category
            ),
        { ssr: false }
    ),
    textBox: dynamic(
        () =>
            import("./textBox").then(
                (mod) => mod.Textbox
            ),
        { ssr: false }
    ),
    textBoxOverride: dynamic(
        () =>
            import("./textBox-override").then(
                (mod) => mod.TextboxOverride
            ),
        { ssr: false }
    ),
    textArea: dynamic(
        () =>
            import("./textArea").then(
                (mod) => mod.TextArea
            ),
        { ssr: false }
    )
}

export const questionEditor = {
    textBox: dynamic(
        () =>
            import("./textBox/textBox-edit").then(
                (mod) => mod.TextboxEdit
            ),
        { ssr: false }
    ),
}