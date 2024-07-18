import {
  faAngleDown,
  faAngleLeft,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import categories from "../utils/filter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(5, "Title should be at least 5 characters long"),
  categories: z.array(z.string()).min(1, "Choose a category"),
  description: z
    .string()
    .min(5, "Description should be at least 5 characters long"),
});

const FeedForm = ({
  icon,
  title,
  buttonText,
  onSubmit,
  defaultTitle,
  defaultCategories,
  defaultDescription,
  DeleteButton = null,
  exitLink,
}) => {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState("");
  const [categoriesSelect, setCategoriesSelect] = useState(
    defaultCategories || [],
  );
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultTitle || "",
      categories: defaultCategories || [],
      description: defaultDescription || "",
    },
  });

  const toggle = () => setOpen(!open);

  const handleSelect = (category) => {
    if (!categoriesSelect.includes(category)) {
      const newCategoriesSelect = [...categoriesSelect, category];
      setCategoriesSelect(newCategoriesSelect);
      setValue("categories", newCategoriesSelect);
    }
    setSelect(category);
    setOpen(false);
  };

  const removeCategory = (category) => {
    const newCategoriesSelect = categoriesSelect.filter(
      (item) => item !== category,
    );
    setCategoriesSelect(newCategoriesSelect);
    setValue("categories", newCategoriesSelect);
  };

  const handleExit = () => {
    navigate(exitLink || "/");
  };

  return (
    <div className="scrollbar-thin scrollbar-thumb-purple scrollbar-track-gray grid h-32 min-h-screen justify-items-center bg-gray py-10 font-jost">
      <div className="scrollbar-thin scrollbar-thumb-purple scrollbar-track-gray grid h-32 w-[90%] max-w-[37em] space-y-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faAngleLeft} className="text-blue" />
            <p
              className="cursor-pointer text-sm font-bold text-gray-darker underline-offset-2 hover:underline"
              onClick={handleExit}
            >
              Go Back
            </p>
          </div>
          {DeleteButton && <DeleteButton />}
        </div>

        <form
          className="relative grid gap-3 rounded-lg bg-white px-7 pb-10 pt-12 sm:gap-5 sm:px-12 sm:pt-16"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="custom-gradient absolute left-7 top-0 grid size-12 -translate-y-1/2 place-items-center rounded-full sm:left-12 sm:size-16">
            {icon}
          </div>

          <h1 className="mb-2 text-lg font-bold text-gray-darkest sm:mb-5 sm:text-2xl">
            {title}
          </h1>

          <div className="grid gap-1">
            <div className="space-y-5">
              <div className="text-gray-darkest">
                <label htmlFor="title" className="text-[0.9rem] font-bold">
                  Feedback Title
                </label>
                <p className="text-[0.9rem]">
                  Add a short, descriptive headline
                </p>
              </div>

              <input
                {...register("title")}
                type="text"
                id="title"
                className="apply-transition w-full rounded-lg border border-gray bg-gray px-5 py-3 text-[0.9rem] text-gray-darkest outline-none hover:border-blue focus:border-blue"
              />
            </div>
            {errors.title && (
              <p className="ml-auto text-[0.8rem] italic text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="relative">
            <div className="grid gap-1">
              <div className="space-y-5">
                <div className="text-gray-darkest">
                  <label htmlFor="category" className="text-[0.9rem] font-bold">
                    Category
                  </label>
                  <p className="text-[0.9rem]">
                    Choose a category for your feedback
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <ul
                      className={
                        categoriesSelect.length > 0
                          ? "flex flex-wrap gap-2 border border-blue/20 p-2"
                          : "border-none p-0"
                      }
                    >
                      {categoriesSelect.map((category) => (
                        <li
                          key={category}
                          className="flex items-center justify-between gap-2 rounded-lg border border-gray bg-gray px-3 py-1 text-[0.9rem] text-gray-darkest"
                        >
                          <p className="font-medium">{category}</p>

                          <FontAwesomeIcon
                            icon={faXmark}
                            className="cursor-pointer text-blue"
                            onClick={() => removeCategory(category)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-full" onClick={toggle}>
                    <div
                      id="category"
                      className="apply-transition flex cursor-pointer items-center justify-between rounded-lg border border-gray bg-gray px-5 py-3 text-[0.9rem] text-gray-darkest hover:border-blue"
                    >
                      {select ? <p>{select}</p> : <p>Choose a category</p>}
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        className={`apply-transition text-blue ${open ? "rotate-180" : "rotate-0"}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {errors.categories && (
                <p className="ml-auto text-[0.8rem] italic text-red-500">
                  {errors.categories.message}
                </p>
              )}
            </div>

            {open && (
              <div className="absolute left-0 z-10 mt-4 w-full">
                <ul className="rounded-lg bg-white shadow-md">
                  {categories.slice(1).map((category) => (
                    <li
                      key={category}
                      className="apply-transition flex cursor-pointer items-center justify-between border border-white px-5 py-3 text-[0.9rem] text-gray-darkest hover:border-blue"
                      onClick={() => handleSelect(category)}
                    >
                      <p className={select === category ? "text-blue" : ""}>
                        {category}
                      </p>
                      {select === category && (
                        <FontAwesomeIcon icon={faCheck} className="text-blue" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="grid gap-1">
            <div className="space-y-5">
              <div className="text-gray-darkest">
                <label
                  htmlFor="description"
                  className="text-[0.9rem] font-bold"
                >
                  Feedback Detail
                </label>
                <p className="text-[0.9rem]">
                  Include any specific comments on what should be improved,
                  added, etc.
                </p>
              </div>

              <textarea
                {...register("description")}
                name="description"
                id="description"
                rows="5"
                className="apply-transition w-full resize-none rounded-lg border border-gray bg-gray px-5 py-4 text-[0.9rem] text-gray-darkest outline-none hover:border-blue focus:border-blue"
              />
            </div>
            {errors.description && (
              <p className="ml-auto text-[0.8rem] italic text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="mt-5 flex flex-col-reverse gap-3 text-[0.8rem] sm:flex-row-reverse sm:text-[0.9rem]">
            <button
              className="apply-transition rounded-lg bg-purple py-3 font-bold text-white hover:bg-purple/70 sm:px-6"
              onClick={handleExit}
              type="button"
            >
              Cancel
            </button>
            <button
              className="apply-transition rounded-lg bg-gray-darkest py-3 font-bold text-white hover:bg-gray-darkest/70 sm:px-7"
              type="submit"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

FeedForm.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  defaultTitle: PropTypes.string,
  defaultCategories: PropTypes.array,
  defaultDescription: PropTypes.string,
  DeleteButton: PropTypes.func,
  exitLink: PropTypes.string,
};

export default FeedForm;
