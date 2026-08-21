import Button from "@/components/Helpers/Button";

export default function AddressForm() {
  return (
    <form className="flex flex-col  items-center">
      <h1 className="text-[20px] font-medium text-secondary-two mb-[18px]">
        Address Book
      </h1>

      <div className="w-[710px] flex justify-center items-center gap-[32px] mt-[20px]">
         <Button
                  content="Cancel"
                  type="button"
                  text="text-secondary-two"
                  bg="bg-gray-100"
                  classes="text-[15px] !py-2.5 !px-8 hover:bg-gray-200"
                />
        <Button
                  content="          Save Changes
"
                  type="button"
                  text="text-white"
                  bg="bg-secondary-two"
                  classes="text-[15px] !py-2.5 !px-8"
                />
      </div>
    </form>
  );
}
