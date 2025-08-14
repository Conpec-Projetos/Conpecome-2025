export default function TextField({
  className = "",
  ...props
}) {
  const defaultClassName =
    "text-[#FF7C0287] placeholder-[#FF7C0287] font-poppins min-w-[250px] h-14 rounded-full px-8 text-[13px] font-black border-2 border-[#ff5a0179] focus:border-[#ff5a01c9] focus:outline-none shadow-sm transition-colors";

  return <input className={`${defaultClassName} ${className}`} {...props} />;
}
