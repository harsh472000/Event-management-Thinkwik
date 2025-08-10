import React, { useMemo } from "react";
import { useFilters } from "@/hooks/useFilter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CommonButton from "@/components/common/CommonButton"; 
import "@/styles/filters.css";
import { DEFAULT } from "@/contexts/FilterContext"; 

const CATS = ["All", "Business", "Tech", "Education", "Health", "Other"] as const;

const Filters = () => {
  const { filters, setFilters } = useFilters();

  const isDirty = useMemo(() => {
    const f = filters;
    const d = DEFAULT;
    return !(
      f.q === d.q &&
      f.eventType === d.eventType &&
      f.category === d.category &&
      (f.from ?? "") === "" &&
      (f.to ?? "") === "" &&
      f.sortBy === d.sortBy
    );
  }, [filters]);

  const onReset = () => setFilters(() => DEFAULT);


  return (
    <div className="filters card">
      <div className="filters-grid">
        {/* Search */}
        <label className="form-group">
          <span>Search</span>
          <input
            className="input"
            placeholder="Title or description"
            value={filters.q}
            onChange={(e) => setFilters((curr) => ({ ...curr, q: e.target.value }))}
          />
        </label>

        {/* Event Type */}
        <label className="form-group">
          <span>Event Type</span>
          <select
            className="input"
            value={filters.eventType}
            onChange={(e) => setFilters((c) => ({ ...c, eventType: e.target.value as any }))}
          >
            <option>All</option>
            <option>Online</option>
            <option>In-Person</option>
          </select>
        </label>

        {/* Category */}
        <label className="form-group">
          <span>Category</span>
          <select
            className="input"
            value={filters.category}
            onChange={(e) => setFilters((c) => ({ ...c, category: e.target.value as any }))}
          >
            {CATS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        {/* From Date */}
        <label className="form-group">
          <span>From Date</span>
          <DatePicker
            selected={filters.from ? new Date(filters.from) : null}
            onChange={(date) =>
              setFilters((c) => ({ ...c, from: date ? date.toISOString().split("T")[0] : undefined }))
            }
            dateFormat="dd MMM yyyy"
            className="input"
            placeholderText="Select start date"
          />
        </label>

        {/* To Date */}
        <label className="form-group">
          <span>To Date</span>
          <DatePicker
            selected={filters.to ? new Date(filters.to) : null}
            onChange={(date) =>
              setFilters((c) => ({ ...c, to: date ? date.toISOString().split("T")[0] : undefined }))
            }
            dateFormat="dd MMM yyyy"
            className="input"
            placeholderText="Select end date"
          />
        </label>

        {/* Sort By */}
        <label className="form-group">
          <span>Sort By</span>
          <select
            className="input"
            value={filters.sortBy}
            onChange={(e) => setFilters((c) => ({ ...c, sortBy: e.target.value as any }))}
          >
            <option value="start">Start Date</option>
            <option value="title">Title</option>
          </select>
        </label>

        <div className="filters-actions">
          <CommonButton variant="primary" size="md" onClick={onReset} disabled={!isDirty}>
            Reset
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default Filters;
