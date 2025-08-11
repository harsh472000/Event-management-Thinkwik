import { useFormik } from "formik";
import * as Yup from "yup";
import { Field, ErrorMessage, FormikProvider } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { EventItem, EventType } from "@/types/event";
import CommonInput from "@/components/common/CommonInput";
import CommonButton from "@/components/common/CommonButton";
import "@/styles/events.css";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  eventType: Yup.string().oneOf(["Online", "In-Person"]).required(),
  location: Yup.string().when("eventType", {
    is: "In-Person",
    then: (schema) =>
      schema.required("Location is required for In-Person events"),
    otherwise: (schema) => schema.notRequired(),
  }),
  eventLink: Yup.string()
    .when("eventType", {
      is: "Online",
      then: (schema) =>
        schema.required("Event link is required for Online events"),
      otherwise: (schema) => schema.notRequired(),
    })
    .test("is-url", "Must be a valid URL", function (value) {
      if (!value || value.trim() === "") return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }),
  startDateTime: Yup.date().required("Start date is required"),
  endDateTime: Yup.date()
    .required("End date is required")
    .test(
      "is-after-start",
      "End time must be after start time",
      function (value) {
        const { startDateTime } = this.parent;
        if (!value || !startDateTime) return true;
        return new Date(value) > new Date(startDateTime);
      }
    ),
  category: Yup.string().required("Category is required"),
});

type FormValues = {
  title: string;
  description: string;
  eventType: EventType;
  location?: string;
  eventLink?: string;
  startDateTime: Date;
  endDateTime: Date;
  category: string;
};

export default function EventForm({
  initial,
  onSubmit,
}: {
  initial?: Partial<EventItem>;
  onSubmit: (values: any) => void;
}) {
  const formik = useFormik<FormValues>({
    initialValues: {
      title: initial?.title ?? "",
      description: initial?.description ?? "",
      eventType: (initial?.eventType as EventType) ?? "Online",
      location: initial?.location ?? "",
      eventLink: initial?.eventLink ?? "",
      startDateTime: initial?.startDateTime
        ? new Date(initial.startDateTime)
        : new Date(),
      endDateTime: initial?.endDateTime
        ? new Date(initial.endDateTime)
        : new Date(Date.now() + 60 * 60 * 1000),
      category: initial?.category ?? "Other",
    },
    validationSchema,
    onSubmit: (values) => {
      // Clean up empty strings to undefined for optional fields
      const cleanData = {
        ...values,
        location: values.location?.trim() || undefined,
        eventLink: values.eventLink?.trim() || undefined,
        startDateTime: values.startDateTime.toISOString(),
        endDateTime: values.endDateTime.toISOString(),
      };
      onSubmit(cleanData);
    },
  });

  return (
    <FormikProvider value={formik}>
      <form className="form card" onSubmit={formik.handleSubmit}>
        <div className="grid two">
          <CommonInput
            name="title"
            label="Title"
            placeholder="Enter event title"
          />

          <label className="form-group">
            <span>Category</span>
            <Field as="select" name="category" className="input">
              <option value="Business">Business</option>
              <option value="Tech">Tech</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </Field>
            <ErrorMessage name="category" component="span" className="err" />
          </label>
        </div>

        <label className="form-group">
          <span>Description</span>
          <Field
            as="textarea"
            name="description"
            className="input"
            rows={4}
            placeholder="Enter event description"
          />
          <ErrorMessage name="description" component="span" className="err" />
        </label>

        <div className="grid two">
          <label className="form-group">
            <span>Event Type</span>
            <Field as="select" name="eventType" className="input">
              <option value="Online">Online</option>
              <option value="In-Person">In-Person</option>
            </Field>
          </label>

          {formik.values.eventType === "Online" ? (
            <CommonInput
              name="eventLink"
              label="Event Link"
              type="url"
              placeholder="https://..."
            />
          ) : (
            <CommonInput
              name="location"
              label="Location"
              placeholder="Address or Venue"
            />
          )}
        </div>

        <div className="grid two">
          <label className="form-group">
            <span>Start Date & Time</span>
            <DatePicker
              selected={formik.values.startDateTime}
              onChange={(date) => formik.setFieldValue("startDateTime", date)}
              onBlur={() => formik.setFieldTouched("startDateTime", true)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="input"
              placeholderText="Select start date and time"
            />
            {formik.touched.startDateTime && typeof formik.errors.startDateTime === "string" && (
              <span className="err">{formik.errors.startDateTime}</span>
            )}
          </label>

          <label className="form-group">
            <span>End Date & Time</span>
            <DatePicker
              selected={formik.values.endDateTime}
              onChange={(date) => formik.setFieldValue("endDateTime", date)}
              onBlur={() => formik.setFieldTouched("endDateTime", true)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="input"
              placeholderText="Select end date and time"
              minDate={formik.values.startDateTime}
            />
            {formik.touched.endDateTime && typeof formik.errors.endDateTime === "string" && (
              <span className="err">{formik.errors.endDateTime}</span>
            )}
          </label>
        </div>

        <div className="event-form-actions">
          <CommonButton type="submit" variant="primary">
            Save
          </CommonButton>
        </div>
      </form>
    </FormikProvider>
  );
}
