export default function AddressForm() {
  return (
    <form className="flex flex-col items-center">
      <h1 className="text-[20px] font-medium text-secondary-two mb-[18px]">
        Address Book
      </h1>

      <div className="w-[710px] flex justify-center items-center gap-[32px] mt-[20px]">
        <button type="button" className="text-[16px] cursor-pointer">
          Cancel
        </button>

        <button
          type="submit"
          className="
            w-[178px]
            h-[48px]
            bg-secondary-two
            text-white
            rounded
            text-[16px]
            cursor-pointer
          "
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
