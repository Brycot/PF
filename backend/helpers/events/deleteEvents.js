const Event = require("../../models/Event");
const DateEvent = require("../../models/DateEvent");
const Income = require("../../models/Income");

const deleteEvent = async (id) => {
  try {
    //Deletes the event
    const event = await Event.findByIdAndDelete(id);
    //Updates date availability
    await DateEvent.findOneAndUpdate(
      { events: { $in: [id] } },
      { $pull: { events: id } },
      { new: true }
    );

    //Substracts amount from total income
    const year = event.date.getFullYear();
    const month = event.date.getMonth();

    const changeIncomes = await Income.findOne({ year });
    await Income.findOneAndUpdate(
      { year },
      {
        incomePerMonth: {
          ...changeIncomes.incomePerMonth,
          [month]: changeIncomes.incomePerMonth[month] - event.amount,
        },
      }
    );

    //Returns the event
    return event;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  deleteEvent,
};
