import React, { memo } from "react";
import { Editor } from "@tinymce/tinymce-react";

const MarkDownEditor = ({
  label,
  value,
  changeValue,
  name,
  invalidField,
  setInvalidField,
}) => {
  return (
    <div className="flex flex-col ">
      <span className="">{label}</span>
      <Editor
        apiKey="omi3v80l2qldvubupiq5875kt06xzf98rkwzr3sluzscqvrr"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onChange={(e) =>
          changeValue((prev) => ({ ...prev, [name]: e.target.getContent() }))
        }
        onFocus={() => setInvalidField && setInvalidField([])}
        initialValue={value}
      />
      {invalidField?.some((el) => el.name === name) && (
        <small className="text-xs text-main">
          {invalidField?.find((el) => el.name === name)?.message}
        </small>
      )}
    </div>
  );
};

export default memo(MarkDownEditor);
