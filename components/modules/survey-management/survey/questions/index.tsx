import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import dynamic from "next/dynamic"

const Loader = () => {
  return (
    <div className="h-36 grid place-items-center font-sans">
      <Badge variant={"outline"}>
        <Spinner /> Preparing ...
      </Badge>
    </div>
  )
}

export const questionFeatureComponents = {
  Category: dynamic(() => import("./category").then((mod) => mod.Category), {
    ssr: false,
    loading: Loader,
  }),
  textBox: dynamic(() => import("./textBox").then((mod) => mod.Textbox), {
    ssr: false,
    loading: Loader,
  }),
  textBoxOverride: dynamic(
    () => import("./textBox-override").then((mod) => mod.TextboxOverride),
    { ssr: false, loading: Loader }
  ),
  textArea: dynamic(() => import("./textArea").then((mod) => mod.TextArea), {
    ssr: false,
    loading: Loader,
  }),
  multipleTextBox: dynamic(
    () => import("./multipleTextBox").then((mod) => mod.MultipleTextBox),
    {
      ssr: false,
      loading: Loader,
    }
  ),
}

export const questionEditor = {
  Category: dynamic(() => import("./default").then((mod) => mod.DefaultEdit), {
    ssr: false,
    loading: Loader,
  }),
  textBox: dynamic(
    () => import("./textBox/textBox-edit").then((mod) => mod.TextboxEdit),
    { ssr: false, loading: Loader }
  ),
  textBoxOverride: dynamic(
    () => import("./textBox/textBox-edit").then((mod) => mod.TextboxEdit),
    { ssr: false, loading: Loader }
  ),
  textArea: dynamic(() => import("./default").then((mod) => mod.DefaultEdit), {
    ssr: false,
    loading: Loader,
  }),
  multipleTextBox: dynamic(
    () =>
      import("./multipleTextBox/multiple-textBox-edit").then(
        (mod) => mod.MultipleTextboxEdit
      ),
    { ssr: false, loading: Loader }
  ),
}
