function StatCard({
  icon,
  title,
  label,
  value
}) {
  const displayTitle = title || label;

  return (
    <div className="dashboard-stat">

      <div className="stat-icon">
        {icon}
      </div>

      <div>

        <span>
          {displayTitle}
        </span>

        <strong>
          {value}
        </strong>

      </div>

    </div>
  );
}

export default StatCard;